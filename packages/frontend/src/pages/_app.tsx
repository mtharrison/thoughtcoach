import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './_theme';

function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
