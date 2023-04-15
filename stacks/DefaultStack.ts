import { WebSocketApi, NextjsSite, StackContext, Config } from 'sst/constructs';

export function DefaultStack({ stack, app }: StackContext) {
  const stage = app.stage;

  const MAINTENANCE_MODE = new Config.Parameter(stack, 'MAINTENANCE_MODE', {
    value: 'false',
  });
  const OPENAI_API_KEY = new Config.Secret(stack, 'OPENAI_API_KEY');

  let frontendDomain = 'matt.thoughtcoach.app';

  switch (stage) {
    case 'dev':
      frontendDomain = 'dev.thoughtcoach.app';
      break;
    case 'prd':
      frontendDomain = 'thoughtcoach.app';
      break;
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
      },
    },
  });

  completionApi.bind([OPENAI_API_KEY]);

  const frontend = new NextjsSite(stack, 'Site', {
    path: 'packages/frontend',
    customDomain: {
      domainName: frontendDomain,
      hostedZone: 'thoughtcoach.app',
    },
    environment: {
      COMPLETION_API_WSS_URL: completionApi.url,
      MAINTENANCE_MODE: MAINTENANCE_MODE.value,
    },
  });

  // Allow the Next.js API to access the table

  // Show the site URL in the output
  stack.addOutputs({
    URL: frontend.url,
    COMPLETION_API_WSS_URL: completionApi.url,
  });
}
