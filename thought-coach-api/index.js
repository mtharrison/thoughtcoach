const {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} = require('@aws-sdk/client-apigatewaymanagementapi');

const { Configuration, OpenAIApi } = require('openai');

const getCompletion = async (req) => {
  const configuration = new Configuration({
    apiKey: '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', // process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const steps = [
    [
      {
        role: 'system',
        content: `I will provide a story about an event that happened to me. 
        I will also provide a thought I had about the event. 
        You will respond in JSON format as if talking to me. 
        The response should be an object with a property called 'distortions': each key is the name of the cognitive distortion at play, the value is an object with keys 'why', 'info' and 'reframe'. 
        Please only choose from the following cognitive distortions: All-or-Nothing Thinking, Overgeneralization, Filtering, Disqualifying the Positive, Jumping to Conclusions, Mind Reading, Fortune Telling, Magnification and Minimization, Emotional Reasoning, Should Statements, Labeling and Mislabeling, Personalization, Blaming, Fallacy of Change, Fallacy of Fairness
        'why' contains a description of how that distortion was at play and the text that was relevant from my input.
        'info' contains a short simple explanation of the cognitive distortion.
        'reframe' contains a healthier way to think about it.`,
      },
      {
        content: (context) => {
          return `Story:\n${context.eventText}\nThought:\n${context.thoughtText}\n`;
        },
        role: 'user',
      },
    ],
  ];

  const messages1 = steps[0].map((s) => {
    if (typeof s.content === 'function') {
      return {
        role: s.role,
        content: s.content(req.body),
      };
    }

    return s;
  });

  const completion1 = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: messages1,
  });

  return { type: 'completions', choices: completion1.data.choices };
};

exports.handler = async (event) => {
  const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const connectionId = event.requestContext.connectionId;
  const callbackUrl = `https://${domain}/${stage}`;
  const client = new ApiGatewayManagementApiClient({ endpoint: callbackUrl });

  const requestParams = {
    ConnectionId: connectionId,
    Data: JSON.stringify(await getCompletion({ body: JSON.parse(event.body) })),
  };

  const command = new PostToConnectionCommand(requestParams);

  try {
    await client.send(command);
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
  };
};

exports.connect = async (event, context) => {
  const connectId = event['requestContext']['connectionId'];
  const domainName = event['requestContext']['domainName'];
  const stageName = event['requestContext']['stage'];
  const qs = event['queryStringParameters'];
  console.log(
    'Connection ID: ',
    connectId,
    'Domain Name: ',
    domainName,
    'Stage Name: ',
    stageName,
    'Query Strings: ',
    qs
  );
  return { statusCode: 200 };
};
