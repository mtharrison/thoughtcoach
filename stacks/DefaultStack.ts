import { Api, NextjsSite, StackContext } from 'sst/constructs';

export function DefaultStack({ stack, app }: StackContext) {
  const completionApi = new Api(stack, 'api', {
    routes: {
      'POST /': 'packages/openai/src/lambda.handler',
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
      COMPLETION_API_URL: completionApi.url,
    },
  });

  // Allow the Next.js API to access the table

  // Show the site URL in the output
  stack.addOutputs({
    URL: frontend.url,
    COMPLETION_API_URL: completionApi.url,
  });
}
