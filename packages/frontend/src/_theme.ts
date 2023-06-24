import { defineStyleConfig, extendTheme } from '@chakra-ui/react';
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
      bg: '#e9efe6',
    },
  }),
};

const colors = {
  headerBlockColor: '#e9efe6',
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
      maxW: '90%',
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
      p: { sm: 5, md: 10 },
      maxW: { sm: '90%', md: '80%' },
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

export default theme;
