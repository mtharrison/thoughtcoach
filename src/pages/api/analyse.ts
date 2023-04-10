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
      content: (context: any) => {
        return `Story:\n${context.eventText}\nThought:\n${context.thoughtText}\n`;
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
  console.log({ type: "req", ...req.body });

  const messages1: any = steps[0].map((s) => {
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

  console.log({ type: "completions", choices: completion1.data.choices });

  res
    .status(200)
    .json(JSON.parse(completion1.data.choices[0].message?.content || "{}"));
}
