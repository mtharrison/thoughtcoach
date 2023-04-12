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
    ],
  ];

  const messages1 = steps[0].map((s) => {
    if (typeof s.content === 'function') {
      return {
        role: s.role,
        content: s.content(req),
      };
    }

    return s;
  });

  const completion1 = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: messages1,
  });

  return completion1.data.choices;
};

exports.completion = async (event) => {
  // for offline usage we can simply use a response because we're not limited by api gateway timeout
  // for dev/prd use we need to use the API gateway and post to the connnection after returning

  const response = await getCompletion(JSON.parse(event.body));

  if (process.env.IS_OFFLINE) {
    return {
      body: JSON.stringify(response),
      statusCode: 200,
    };
  }

  const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const connectionId = event.requestContext.connectionId;
  const callbackUrl = `https://${domain}/${stage}`;
  const client = new ApiGatewayManagementApiClient({ endpoint: callbackUrl });

  const requestParams = {
    ConnectionId: connectionId,
    Data: JSON.stringify(response),
  };

  const command = new PostToConnectionCommand(requestParams);

  try {
    await client.send(command);
  } catch (error) {
    return {
      statusCode: 500,
    };
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
