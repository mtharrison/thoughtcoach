// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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", // process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const steps = [
  [
    {
      role: "system",
      content:
        "I will provide a story about an event that happened to me. I will also provide a thought I had about the event. You will respond in JSON format as if talking to me. The response should be an object with a property called 'distortions', each key is the name of the cognitive distortion at play, the value is an explanation of why you decided that. Additionally include a top level property called 'reframe' with a healthier reframing of the story. Please only choose from the following cognitive distortions: All-or-Nothing Thinking, Overgeneralization, Filtering, Disqualifying the Positive, Jumping to Conclusions, Mind Reading, Fortune Telling, Magnification and Minimization, Emotional Reasoning, Should Statements, Labeling and Mislabeling, Personalization, Blaming, Fallacy of Change, Fallacy of Fairness",
    },
    {
      content: (context: any) => {
        return `Story:\n${context.eventText}\nThought:\n${context.thoughtText}\n`;
      },
      role: "user",
    },
  ],
  [
    {
      role: "system",
      content:
        'Given a story, a thought and a list of cognitive distortions return in JSON the exact text substrings associated with each distortion in the format: { "distortion": ["..."] }',
    },
    {
      content: (context: any) => {
        return `Story:\n${context.eventText}\nThought:\n${
          context.thoughtText
        }\nCognitive Distortions: ${Object.keys(context.distortions).join(
          ","
        )}`;
      },
      role: "user",
    },
  ],
];

type FormattedMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const messages1: FormattedMessage[] = steps[0].map((s) => {
    if (typeof s.content === "function") {
      return {
        role: s.role,
        content: s.content(req.body),
      };
    }

    return s;
  });

  const completion1 = await openai.createChatCompletion({
    model: "gpt-4",
    messages: messages1 as FormattedMessage[],
  });

  console.log(completion1.data.choices);

  const res1 = JSON.parse(
    completion1.data.choices[0].message?.content as string
  );

  const messages2: FormattedMessage[] = steps[1].map((s) => {
    if (typeof s.content === "function") {
      return {
        role: s.role,
        content: s.content({ ...req.body, distortions: res1.distortions }),
      };
    }

    return s;
  });

  const completion2 = await openai.createChatCompletion({
    model: "gpt-4",
    messages: messages2 as FormattedMessage[],
  });

  const res2 = JSON.parse(
    completion2.data.choices[0].message?.content as string
  );

  res.status(200).json({
    step1: res1,
    step2: res2,
  });
}
