import type { Meta, StoryObj } from '@storybook/react';

import { Distortions } from './distortions';

const meta: Meta<typeof Distortions> = {
  title: 'ThoughtCoach/Components/Distortions',
  component: Distortions,
  argTypes: {},
};

const lipsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ';

export default meta;
type Story = StoryObj<typeof Distortions>;

export const Primary: Story = {
  args: {
    showFeedbackButton: true,
    thought: 'I had a nice thought',
    distortions: [
      {
        name: 'A test',
        link: 'http://google.com',
        color: 'pink',
        spans: ['had'],
        sections: [
          {
            heading: 'A heading 1',
            body: lipsum,
          },
          {
            heading: 'A heading 1',
            body: lipsum,
          },
          {
            heading: 'A heading 1',
            body: lipsum,
          },
        ],
      },
      {
        name: 'A test',
        link: 'http://google.com',
        color: 'red',
        spans: ['thought'],
        sections: [
          {
            heading: 'A heading 1',
            body: lipsum,
          },
          {
            heading: 'A heading 1',
            body: lipsum,
          },
          {
            heading: 'A heading 1',
            body: lipsum,
          },
        ],
      },
      {
        name: 'A test',
        link: 'http://google.com',
        color: 'green',
        spans: ['nice'],
        sections: [
          {
            heading: 'A heading 1',
            body: lipsum,
          },
          {
            heading: 'A heading 1',
            body: lipsum,
          },
          {
            heading: 'A heading 1',
            body: lipsum,
          },
        ],
      },
      {
        name: 'A test',
        link: 'http://google.com',
        color: 'green',
        spans: ['nice'],
        sections: [
          {
            heading: 'A heading 1',
            body: lipsum,
          },
          {
            heading: 'A heading 1',
            body: lipsum,
          },
          {
            heading: 'A heading 1',
            body: lipsum,
          },
        ],
      },
      {
        name: 'A test',
        link: 'http://google.com',
        color: 'green',
        spans: ['nice'],
        sections: [
          {
            heading: 'A heading 1',
            body: lipsum,
          },
          {
            heading: 'A heading 1',
            body: lipsum,
          },
          {
            heading: 'A heading 1',
            body: lipsum,
          },
        ],
      },
      {
        name: 'A test',
        link: 'http://google.com',
        color: 'green',
        spans: ['nice'],
        sections: [
          {
            heading: 'A heading 1',
            body: lipsum,
          },
          {
            heading: 'A heading 1',
            body: lipsum,
          },
          {
            heading: 'A heading 1',
            body: lipsum,
          },
        ],
      },
    ],
  },
};
