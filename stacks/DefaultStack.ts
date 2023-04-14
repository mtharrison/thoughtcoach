import { Api, WebSocketApi, NextjsSite, StackContext } from 'sst/constructs';

export function DefaultStack({ stack, app }: StackContext) {
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

  const frontend = new NextjsSite(stack, 'Site', {
    path: 'packages/frontend',
    environment: {
      COMPLETION_API_WSS_URL: completionApi.url,
    },
  });

  // Allow the Next.js API to access the table

  // Show the site URL in the output
  stack.addOutputs({
    URL: frontend.url,
    COMPLETION_API_WSS_URL: completionApi.url,
  });
}
