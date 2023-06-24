import { APIGatewayProxyHandler } from 'aws-lambda';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { Config } from 'sst/node/config';
import { z } from 'zod';

import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from 'langchain/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';

declare module 'sst/node/config' {
  export interface SecretResources {
    OPENAI_API_KEY: {
      value: string;
    };
  }
}

export const main: APIGatewayProxyHandler = async (event) => {
  const input = JSON.parse(event.body);
  const { stage, domainName, connectionId } = event.requestContext;

  const apiG = new ApiGatewayManagementApi({
    endpoint: `${domainName}/${stage}`,
  });

  const chat = new ChatOpenAI({
    temperature: 0.5,
    openAIApiKey: Config.OPENAI_API_KEY,
    modelName: 'gpt-4-0613',
  });

  const { eventText, thoughtText } = input.body;

  // Detect if advice is required

  const step1Prompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `You are a Cognitive Behavioural Therapist. I will provide a story about an event that happened to me. 
    I will also provide a thought I had about the event.
    Tell me whether that thought about the event is balanced, distorted or invalid.
    An invalid input is one that is not clearly an event and though relevant to therapy. Provide your reasoning of the decision.
    The response must be valid JSON {format_instructions}`
    ),
    HumanMessagePromptTemplate.fromTemplate(
      `Story:\n{event}\nThought:\n{thought}\n`
    ),
  ]);

  const step1Parser = StructuredOutputParser.fromZodSchema(
    z.object({
      classification: z
        .enum(['balanced', 'distorted', 'invalid'])
        .describe('is this though and event balanced, distorted or invalid?'),
      reasoning: z
        .string()
        .describe('Explain your reasoning for choosing the classification'),
    })
  );

  const prompt1 = await step1Prompt.formatPromptValue({
    event: eventText.slice(0, 800),
    thought: thoughtText.slice(0, 800),
    format_instructions: step1Parser.getFormatInstructions(),
  });
  const messages1 = prompt1.toChatMessages();
  const response1 = await chat.call(messages1);
  const resData1 = response1.text;

  const { classification, reasoning } = await step1Parser.parse(resData1);

  if (classification !== 'distorted') {
    await apiG
      .postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify({ classification, reasoning }),
      })
      .promise();
  } else {
    const step2Prompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        `I will provide a story about an event that happened to me. 
    I will also provide a thought I had about the event. 
    You will respond in valid JSON format as if talking to me. 
    The response should be an object with a property called 'distortions': each key is the name of the cognitive distortion at play, the value is an object with keys 'why', 'info' and 'reframe'. 
    Please only choose from the following cognitive distortions: All-or-Nothing Thinking, Overgeneralization, Filtering, Disqualifying the Positive, Jumping to Conclusions, Mind Reading, Fortune Telling, Magnification and Minimization, Emotional Reasoning, Should Statements, Labeling and Mislabeling, Personalization, Blaming, Fallacy of Change
    'spans' is an array of the substrings where I used this distortion.
    'info' contains a short simple explanation of the cognitive distortion.
    'reframe' contains a healthier way to think about it.
    The response must be valid JSON {format_instructions}`
      ),
      HumanMessagePromptTemplate.fromTemplate(
        `Story:\n{event}\nThought:\n{thought}\n`
      ),
    ]);

    const step2Parser = StructuredOutputParser.fromZodSchema(
      z.object({
        reframe: z
          .string()
          .describe(
            'A healthier thought about the story and event that I can tell myself, which is more balanced and without cognitive distortions'
          ),
        advice: z
          .string()
          .describe(
            'What steps can I take to learn healthier thought patterns around this event'
          ),
        distortions: z.record(
          z
            .enum([
              'All-or-Nothing Thinking',
              'Overgeneralization',
              'Filtering',
              'Disqualifying the Positive',
              'Jumping to Conclusions',
              'Mind Reading',
              'Fortune Telling',
              'Magnification and Minimization',
              'Emotional Reasoning',
              'Should Statements',
              'Labeling and Mislabeling',
              'Personalization',
              'Blaming',
              'Fallacy of Change',
            ])
            .describe(
              'the name of the cognitive distortion detected in the thought'
            ),
          z
            .object({
              spans: z
                .array(
                  z.string().describe('a vertabim span of the input thought')
                )
                .describe(
                  'all the incidences of this cognitive distortions in the thought'
                ),
              info: z
                .string()
                .describe('A description of what this distortion is'),
              reframe: z
                .string()
                .describe(
                  'A way this thought can be reframed with respect to this distortion into a healthier balanced perspective'
                ),
              confidence: z
                .number()
                .describe(
                  'how confident between 0 and 100 of the presence of this distortion'
                ),
            })
            .describe('each cognitive distortion at play in the input thought')
        ),
      })
    );

    const prompt = await step2Prompt.formatPromptValue({
      event: eventText.slice(0, 800),
      thought: thoughtText.slice(0, 800),
      format_instructions: step2Parser.getFormatInstructions(),
    });
    const messages = prompt.toChatMessages();
    const response = await chat.call(messages);
    const resData = response.text;

    const parsed = await step2Parser.parse(resData);

    await apiG
      .postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify(parsed),
      })
      .promise();
  }

  return {
    statusCode: 200,
  };
};
