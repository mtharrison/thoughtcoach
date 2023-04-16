import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../_theme';
import { useEffect } from 'react';

function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      sessionStorage.setItem('token', token);
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
