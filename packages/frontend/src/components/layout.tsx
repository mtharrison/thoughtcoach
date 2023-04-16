import { Box, Container, Heading, Highlight } from '@chakra-ui/react';
import Head from 'next/head';
import { ReactNode, useState, useEffect } from 'react';
import * as constants from '../constants';

import Content from 'content';

import Alert from './alert';
import Header from './header';
import Disclaimer from './disclaimer';

export default function Layout({ children }: { children: ReactNode }) {
  const [error, setError] = useState('');
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  useEffect(() => {
    const accepted = sessionStorage.getItem('disclaimerAccepted') === 'true';
    if (accepted) {
      setDisclaimerAccepted(true);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      'disclaimerAccepted',
      disclaimerAccepted ? 'true' : 'false'
    );
  }, [disclaimerAccepted]);

  return (
    <>
      <>
        <Head>
          <title>{constants.site.name}</title>
          <meta name="description" content={constants.site.description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container p={0} pb={10} h="100%" w="100%" maxW="100%">
          <Container rounded={'xl'} p={0} maxW={{ sm: '100%', md: '80%' }}>
            <Disclaimer
              disclaimerAccepted={disclaimerAccepted}
              setDisclaimerAccepted={setDisclaimerAccepted}
            ></Disclaimer>
          </Container>
          <Alert
            open={error != ''}
            onClose={() => {
              setError('');
            }}
            title="An error occured"
            description="Please close this box and try again"
          ></Alert>
          <Box p={3} bg="headerBlockColor">
            <Header />
            <Container centerContent mt={10} mb={10}>
              <Heading
                color="headingColor1"
                textAlign="center"
                lineHeight="tall"
                size="xl"
              >
                <Highlight
                  query={Content.general.strapline.primary.hightlights}
                  styles={{
                    color: 'highlight',
                  }}
                >
                  {Content.general.strapline.primary.text}
                </Highlight>
              </Heading>
              <Heading
                color="headingColor2"
                textAlign="center"
                lineHeight="10"
                size="md"
                mt={3}
              >
                {Content.general.strapline.secondary.text}
              </Heading>
            </Container>
          </Box>
          <main>{children}</main>
        </Container>
      </>
    </>
  );
}
