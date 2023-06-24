import type { Meta, StoryObj } from '@storybook/react';

import Input from '../components/input';

const meta: Meta<typeof Input> = {
  title: 'ThoughtCoach/Components/Input',
  component: Input,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    eventText: 'I did something',
    thoughtText: 'I thought something',
  },
};
