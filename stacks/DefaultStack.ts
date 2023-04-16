import {
  Auth,
  WebSocketApi,
  Api,
  NextjsSite,
  StackContext,
  Config,
  Table,
} from 'sst/constructs';

export function DefaultStack({ stack, app }: StackContext) {
  const stage = app.stage;

  const MAINTENANCE_MODE = new Config.Parameter(stack, 'MAINTENANCE_MODE', {
    value: 'false',
  });
  const OPENAI_API_KEY = new Config.Secret(stack, 'OPENAI_API_KEY');

  // Tables

  const feedbackTable = new Table(stack, 'Feedback', {
    fields: {
      id: 'string',
      body: 'string',
    },
    primaryIndex: { partitionKey: 'id' },
  });

  // Frontend

  let frontendDomain = 'matt.thoughtcoach.app';

  switch (stage) {
    case 'dev':
      frontendDomain = 'dev.thoughtcoach.app';
      break;
    case 'prd':
      frontendDomain = 'thoughtcoach.app';
      break;
  }

  const responseCacheTable = new Table(stack, 'ResponseCache', {
    fields: {
      id: 'string',
    },
    primaryIndex: { partitionKey: 'id' },
  });

  const completionApi = new WebSocketApi(stack, 'Api', {
    routes: {
      $connect: 'packages/openai/src/connect.main',
      $default: 'packages/openai/src/connect.main',
      $disconnect: 'packages/openai/src/connect.main',
      completion: 'packages/openai/src/completion.main',
    },
    defaults: {
      function: {
        timeout: '120 seconds',
        bind: [responseCacheTable],
      },
    },
  });

  completionApi.bind([OPENAI_API_KEY]);

  const feedbackApi = new Api(stack, 'FeedbackAPI', {
    routes: {
      'POST   /feedback': 'packages/feedback/src/feedback.main',
    },
    defaults: {
      function: {
        bind: [feedbackTable],
      },
    },
  });

  const adminApi = new Api(stack, 'AdminAPI', {
    routes: {
      'GET   /session': 'packages/admin/src/session.handler',
    },
    defaults: {
      function: {
        bind: [feedbackTable],
      },
    },
  });

  const frontend = new NextjsSite(stack, 'Site', {
    path: 'packages/frontend',
    customDomain: {
      domainName: frontendDomain,
      hostedZone: 'thoughtcoach.app',
    },
    environment: {
      COMPLETION_API_WSS_URL: completionApi.url,
      FEEDBACK_URL: feedbackApi.url,
      MAINTENANCE_MODE: MAINTENANCE_MODE.value,
      ADMIN_URL: adminApi.url,
    },
  });

  adminApi.bind([frontend]);

  const adminAuth = new Auth(stack, 'AdminAuth', {
    authenticator: {
      handler: 'packages/admin/src/auth.handler',
      bind: [frontend],
    },
  });

  adminAuth.attach(stack, {
    api: adminApi,
    prefix: '/auth',
  });

  // Show the site URL in the output
  stack.addOutputs({
    URL: frontend.url,
    COMPLETION_API_WSS_URL: completionApi.url,
    FEEDBACK_URL: feedbackApi.url,
    ADMIN_URL: adminApi.url,
  });
}
