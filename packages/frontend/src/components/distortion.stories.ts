import type { Meta, StoryObj } from '@storybook/react';

import { Distortion } from './distortions';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Distortion> = {
  title: 'ThoughtCoach/Components/Distortion',
  component: Distortion,
  argTypes: {},
};

const lipsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export default meta;
type Story = StoryObj<typeof Distortion>;

export const Primary: Story = {
  args: {
    name: 'A test',
    link: 'http://google.com',
    color: 'pink',
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
};
