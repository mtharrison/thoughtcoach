import { Box, Container, Heading, Highlight } from '@chakra-ui/react';
import Head from 'next/head';
import { ReactNode, useState } from 'react';
import * as constants from '../constants';

import Alert from '@/components/alert';
import Header from '@/components/header';

export default function Layout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
          <Alert
            isOpen={error != ''}
            dialogClose={() => {
              setError('');
              setLoading(false);
            }}
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
                  query={['perspective', 'life']}
                  styles={{
                    color: 'highlight',
                  }}
                >
                  Change your perspective, change your life
                </Highlight>
              </Heading>
              <Heading
                color="headingColor2"
                textAlign="center"
                lineHeight="10"
                size="md"
                mt={3}
              >
                The simple app that helps you to reframe negative thoughts
              </Heading>
            </Container>
          </Box>
          <main>{children}</main>
        </Container>
      </>
    </>
  );
}
