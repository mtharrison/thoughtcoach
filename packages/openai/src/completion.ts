import { APIGatewayProxyHandler } from 'aws-lambda';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { Config } from 'sst/node/config';
const { Configuration, OpenAIApi } = require('openai');
import { DynamoDB } from 'aws-sdk';
import { Table } from 'sst/node/table';
import { createHash } from 'crypto';

const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async (event) => {
  const input = JSON.parse(event.body);
  const { stage, domainName, connectionId } = event.requestContext;

  // first try to see if it's in the cache

  const hash = createHash('sha256');
  const cacheKey = hash
    .update(`${input.body.eventText}$$$$${input.body.thoughtText}`)
    .digest('hex');

  const getParams = {
    // @ts-ignore
    TableName: Table.ResponseCache.tableName,
    // Get the row where the counter is called "hits"
    Key: {
      id: cacheKey,
    },
  };

  const results = await dynamoDb.get(getParams).promise();

  const apiG = new ApiGatewayManagementApi({
    endpoint: `${domainName}/${stage}`,
  });

  let resData;
  let cached = false;

  if (results.Item !== undefined) {
    cached = true;
    resData = results.Item.body;
  } else {
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

    resData = completion.data.choices[0].message.content;
  }

  await apiG
    .postToConnection({
      ConnectionId: connectionId,
      Data: resData,
    })
    .promise();

  if (!cached) {
    const putParams = {
      //@ts-ignore
      TableName: Table.ResponseCache.tableName,
      Key: {
        id: cacheKey,
      },
      // Update the "tally" column
      UpdateExpression: 'SET body = :s',
      ExpressionAttributeValues: {
        // Increase the count
        ':s': resData,
      },
    };
    await dynamoDb.update(putParams).promise();
  }

  return {
    statusCode: 200,
  };
};
