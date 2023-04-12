import { Container, Link, Text } from '@chakra-ui/react';
import Head from 'next/head';

import Header from '../components/header';

import * as constants from '../constants';

export default function Privacy() {
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
          We don't save, log or cache your inputs so we have no idea what you
          share with this app. However as we leverage OpenAI's API we cannot
          speak to their data retention and reuse policies. Take a look at their
          privacy policy here:{' '}
          <Link href="https://openai.com/policies/privacy-policy">
            https://openai.com/policies/privacy-policy
          </Link>
        </Text>
      </Container>
    </>
  );
}
