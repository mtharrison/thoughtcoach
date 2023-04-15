import type { Meta, StoryObj } from '@storybook/react';

import Header from './header';

const meta: Meta<typeof Header> = {
  title: 'ThoughtCoach/Components/Header',
  component: Header,
  argTypes: {},
};

const lipsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ';

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  args: {},
};
