import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { Comfortaa } from "next/font/google";

const headerFont = Comfortaa({
  subsets: ["latin"],
});

const breakpoints = {
  sm: "320px", // mobile
  md: "768px", // tablet
  lg: "960px", // table/desktop
  xl: "1200px", // desktop
  "2xl": "1536px", // desktop
};

const fonts = {
  heading: headerFont.style.fontFamily,
};

const theme = extendTheme({ breakpoints, fonts });

function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
