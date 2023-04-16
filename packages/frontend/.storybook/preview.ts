import type { Preview } from '@storybook/react';

import theme from '../src/pages/_theme';

export const parameters = {
  chakra: {
    theme,
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
