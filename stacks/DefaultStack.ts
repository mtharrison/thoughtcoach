import {
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

  let frontendDomain = 'thoughtcoach.app';

  if (stage !== 'prd') {
    frontendDomain = `${stage}.${frontendDomain}`;
  }

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
        bind: [OPENAI_API_KEY],
      },
    },
  });

  const feedbackTable = new Table(stack, 'Feedback', {
    fields: {
      id: 'string',
      body: 'string',
    },
    primaryIndex: { partitionKey: 'id' },
  });

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
    },
  });

  // Show the site URL in the output
  stack.addOutputs({
    URL: frontend.url,
    COMPLETION_API_WSS_URL: completionApi.url,
    FEEDBACK_URL: feedbackApi.url,
  });
}
