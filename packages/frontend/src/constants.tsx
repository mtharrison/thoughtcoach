import { DistortionsConfig } from './types';

const distortions: DistortionsConfig = {
  'All-or-Nothing Thinking': {
    description:
      'This cognitive distortion involves seeing things in black and white, without acknowledging any shades of gray. People with this mindset tend to perceive things as either perfect or a complete failure, with no middle ground.',
    example:
      'If a student gets a B on an exam, they might think that they are a failure and will never succeed.',
    color: '#81A9A0',
    link: 'https://en.wikipedia.org/wiki/Cognitive_distortion#All-or-nothing_thinking',
  },
  Overgeneralization: {
    description:
      'This distortion involves drawing overly broad conclusions based on limited evidence. People who overgeneralize tend to believe that negative events are part of a never-ending pattern or that a single negative event indicates a larger character flaw.',
    example:
      'If someone is rejected in a social situation, they might conclude, "Nobody will ever like me."',
    color: '#C4A6FE',
    link: 'https://en.wikipedia.org/wiki/Cognitive_distortion#Overgeneralizing',
  },
  Filtering: {
    description:
      'Filtering means focusing exclusively on the negative aspects of an experience while ignoring the positive.',
    example:
      'After receiving compliments and one criticism on a work presentation, someone with this distortion might dwell on the criticism and convince themselves that they did a terrible job.',
    color: '#3F3962',
    link: 'https://en.wikipedia.org/wiki/Cognitive_distortion#Mental_filtering',
  },
  'Disqualifying the Positive': {
    description:
      'This distortion involves dismissing positive experiences as unimportant or not valid, often based on arbitrary criteria.',
    example:
      'A person might think, "I only got that promotion because I got lucky, not because I\'m good at my job."',
    color: '#168671',
    link: 'https://en.wikipedia.org/wiki/Cognitive_distortion#Disqualifying_the_positive',
  },
  'Jumping to Conclusions': {
    description:
      'This distortion involves making assumptions about a situation without adequate evidence. There are two types of jumping to conclusions: mind reading and fortune telling.',
    example:
      'For example, Sarah notices that her friend Emily seems distant and unresponsive during their conversation. Assuming that Emily is upset with her, Sarah jumps to the conclusion that she must have done something to make Emily angry. In reality, Emily might simply be tired, stressed, or preoccupied with something unrelated to Sarah.',
    color: '#E4B11D',
    link: 'https://en.wikipedia.org/wiki/Cognitive_distortion#Jumping_to_conclusions',
  },
  'Mind Reading': {
    description:
      'This is the tendency to assume we know what others are thinking or feeling, often assuming negative thoughts or judgments without confirming them.',
    example:
      'Someone might believe that their coworker is angry with them just because they have a serious expression on their face.',
    color: '#E6E6FA',
    link: 'https://en.wikipedia.org/wiki/Cognitive_distortion#Mind_reading',
  },
  'Fortune Telling': {
    description:
      'This cognitive distortion involves predicting negative outcomes for future events without any evidence.',
    example:
      "A person might assume they will do poorly in an upcoming job interview, even though they haven't had it yet.",
    color: '#413B63',
    link: 'https://en.wikipedia.org/wiki/Cognitive_distortion#Fortune-telling',
  },
  'Magnification and Minimization': {
    description:
      'This distortion involves exaggerating the significance of negative events while downplaying the importance of positive experiences.',
    example:
      'A person might dwell on a minor mistake they made while ignoring their many accomplishments.',
    color: '#D8C7C3',
    link: 'https://en.wikipedia.org/wiki/Cognitive_distortion#Magnification_and_minimization',
  },
  'Emotional Reasoning': {
    description:
      'This distortion involves basing beliefs or decisions on emotions, rather than objective evidence.',
    example:
      'A person might think, "I feel guilty; therefore I must have done something terrible."',
    color: '#5092B0',
    link: 'https://en.wikipedia.org/wiki/Cognitive_distortion#Emotional_reasoning',
  },
  'Should Statements': {
    description:
      'This cognitive distortion involves rigidly applying rules or expectations to oneself or others, often leading to frustration and disappointment. ',
    example:
      'A person might think, "I should always be happy" or "She should understand me without me having to explain myself."',
    color: '#6B79F5',
    link: "https://en.wikipedia.org/wiki/Cognitive_distortion#Should/shouldn't_and_must/mustn't_statements",
  },
  'Labeling and Mislabeling': {
    description:
      'Labeling involves attaching a negative label to oneself or others, while mislabeling involves exaggerating or distorting these qualities.',
    example:
      'A person who makes a mistake might think, "I\'m a complete loser."',
    color: '#B18984',
    link: 'https://en.wikipedia.org/wiki/Cognitive_distortion#Labeling',
  },
  Personalization: {
    description:
      "This distortion involves taking responsibility for negative events that are not directly within one's control.",
    example:
      "If a friend is in a bad mood, someone might think it's their fault and that they caused their friend's mood.",
    color: '#FFC0CB',
    link: 'https://en.wikipedia.org/wiki/Cognitive_distortion#Personalization_and_blaming',
  },
  Blaming: {
    description:
      'This distortion involves unfairly assigning blame to oneself or others for negative events.',
    example:
      'A person might blame their partner for their own unhappiness instead of looking at other factors.',
    color: '#CACF25',
    link: 'https://en.wikipedia.org/wiki/Cognitive_distortion#Personalization_and_blaming',
  },
  'Fallacy of Change': {
    description:
      'This cognitive distortion involves the belief that other people must change in order for one to be happy or fulfilled.',
    example:
      'Someone might think, "If only my partner was more affectionate, then I would be happy."',
    color: '#D2B48C',
    link: 'https://en.wikipedia.org/wiki/Cognitive_distortion#Fallacy_of_change',
  },
};

export const site = {
  name: 'Thought Coach',
  sponsorship: true,
  domain: 'thoughtcoach.app',
  description: 'Helping you to think rationally',
  examples: [
    {
      event: 'Got a low grade on a test',
      thought: "I'm such a failure, I'll never succeed in anything.",
    },
    {
      event: 'Got rejected by someone they liked',
      thought: "I'm unlovable and nobody will ever want to be with me.",
    },
    {
      event: 'Got passed over for a promotion at work',
      thought:
        "I'm not good enough for this job and I'll never advance in my career.",
    },
    {
      event: 'Got into an argument with a friend',
      thought:
        "They must hate me now, I'm a terrible friend and can't maintain relationships.",
    },
    {
      event: 'Failed to complete a task on time',
      thought:
        "I'm so lazy and incompetent, I'll never be able to accomplish anything important.",
    },
    {
      event: 'Got criticized by a supervisor',
      thought:
        "I'm a complete failure and they're probably going to fire me soon.",
    },
    {
      event: 'Made a mistake in front of others',
      thought:
        "Everyone thinks I'm an idiot now and I'm never going to live this down.",
    },
    {
      event: 'Missed an important deadline',
      thought:
        "I'm a total screw-up and I'll never be able to get anything done on time.",
    },
    {
      event: 'Got rejected by a job application',
      thought:
        "I'm never going to find a job, I'm not qualified for anything and nobody wants me.",
    },
    {
      event: 'Lost a valued possession',
      thought:
        "I'm such a careless person and I can't even keep track of my own belongings.",
    },
  ],
  distortions: distortions,
};
