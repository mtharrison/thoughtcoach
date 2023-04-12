const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: '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', // process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const getCompletion = async (body) => {
  const steps = [
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
  ];

  const messages = steps.map((s) => {
    if (typeof s.content === 'function') {
      return {
        role: s.role,
        content: s.content(JSON.parse(body)),
      };
    }

    return s;
  });

  const completion = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: messages,
  });

  return completion.data.choices;
};

exports.completion = async (event) => {
  return {
    body: JSON.stringify(await getCompletion(event.body)),
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
