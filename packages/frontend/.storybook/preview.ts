import type { Preview } from '@storybook/react';

import { chakraTheme } from '../src/pages/_app';

export const parameters = {
  chakra: {
    theme: chakraTheme,
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
