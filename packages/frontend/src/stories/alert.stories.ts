import type { Meta, StoryObj } from '@storybook/react';

import Alert from '../components/alert';

const meta: Meta<typeof Alert> = {
  title: 'ThoughtCoach/Components/Alert',
  component: Alert,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Primary: Story = {
  args: {
    open: true,
    title: "We're sorry, an error occured",
    description:
      "This is a known issue that we're working to resolve. Close this dialog box and try to submit your request again.",
  },
};

export const AnotherExample: Story = {
  args: {
    open: true,
    title: 'Oh Hai',
    description:
      "This is a known issue that we're working to resolve. Close this dialog box and try to submit your request again.",
  },
};
