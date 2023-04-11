import { Container, Link, Text } from '@chakra-ui/react';
import Head from 'next/head';

import Header from '../components/header';

import * as constants from '../constants';

export default function CognitiveDistortions() {
  return (
    <>
      <Head>
        <title>{constants.site.name}</title>
        <meta name="description" content={constants.site.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="80rem">
        <Header />
        <Text>
          For any feedback please use the{' '}
          <Link
            textDecoration="underline"
            href="https://forms.gle/f6kiJpADhrGi2SQSA"
          >
            Google Form here.
          </Link>{' '}
          Inlcude an email address if you would like a reply.
        </Text>
      </Container>
    </>
  );
}
