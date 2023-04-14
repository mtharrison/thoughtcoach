import { APIGatewayProxyHandler } from 'aws-lambda';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { Config } from 'sst/node/config';
const { Configuration, OpenAIApi } = require('openai');

export const main: APIGatewayProxyHandler = async (event) => {
  const input = JSON.parse(event.body);
  const { stage, domainName, connectionId } = event.requestContext;

  const apiG = new ApiGatewayManagementApi({
    endpoint: `${domainName}/${stage}`,
  });

  const configuration = new Configuration({
    //@ts-ignore
    apiKey: Config.OPENAI_API_KEY as unknown as string,
  });

  const openai = new OpenAIApi(configuration);

  const steps = [
    {
      role: 'system',
      content: `I will provide a story about an event that happened to me. 
          I will also provide a thought I had about the event. 
          You will respond in valid JSON format as if talking to me. 
          The response should be an object with a property called 'distortions': each key is the name of the cognitive distortion at play, the value is an object with keys 'why', 'info' and 'reframe'. 
          Please only choose from the following cognitive distortions: All-or-Nothing Thinking, Overgeneralization, Filtering, Disqualifying the Positive, Jumping to Conclusions, Mind Reading, Fortune Telling, Magnification and Minimization, Emotional Reasoning, Should Statements, Labeling and Mislabeling, Personalization, Blaming, Fallacy of Change
          'spans' is an array of the substrings where I used this distortion.
          'info' contains a short simple explanation of the cognitive distortion.
          'reframe' contains a healthier way to think about it.
          The response must be valid JSON`,
    },
    {
      content: (context) => {
        return `Story:\n${context.eventText}\nThought:\n${context.thoughtText}\n`;
      },
      role: 'user',
    },
  ];

  const messages = steps.map((s) => {
    if (typeof s.content === 'function') {
      return {
        role: s.role,
        content: s.content(input.body),
      };
    }

    return s;
  });

  const completion = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: messages,
  });

  await apiG
    .postToConnection({
      ConnectionId: connectionId,
      Data: completion.data.choices[0].message.content,
    })
    .promise();

  return {
    statusCode: 200,
  };
};
