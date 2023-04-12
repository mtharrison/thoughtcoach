import '@/styles/globals.css';
import {
  ChakraProvider,
  defineStyleConfig,
  extendTheme,
} from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import { Comfortaa } from 'next/font/google';

const headerFont = Comfortaa({
  subsets: ['latin'],
});

const breakpoints = {
  sm: '320px', // mobile
  md: '768px', // tablet
  lg: '960px', // table/desktop
  xl: '1200px', // desktop
  '2xl': '1536px', // desktop
};

const fonts = {
  heading: headerFont.style.fontFamily,
};

const styles = {
  global: () => ({
    body: {
      bg: '#FFFCF2',
    },
  }),
};

const colors = {
  headerBlockColor: '#FFFCF2',
  headingColor1: '#252422',
  headingColor2: '#69645e',
  containerBgColor: '#FFFFFF',
  textarea: '#FFFFFF',
  highlight: '#CB4967',
};

const Container = defineStyleConfig({
  baseStyle: {},
  // Two sizes: sm and md
  sizes: {
    sm: {
      maxW: '100%',
    },
    md: {
      maxW: '80%',
    },
  },
  // Two variants: outline and solid
  variants: {
    main: {
      boxShadow: 'md',
      borderRadius: 'md',
      mb: 5,
      bg: 'gray.50',
      rounded: 'md',
      p: 10,
    },
    min: {
      boxShadow: 'md',
      borderRadius: 'md',
      mb: 5,
      bg: 'gray.50',
      rounded: 'md',
      maxW: 'fit-content',
      p: 5,
      justifyItems: 'flex-start',
    },
    normal: {},
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'normal',
  },
});

const theme = extendTheme({
  breakpoints,
  fonts,
  styles,
  colors,
  components: { Container },
});

function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <Analytics />
    </ChakraProvider>
  );
}

export default App;
