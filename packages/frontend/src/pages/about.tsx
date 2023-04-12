import { Container, Text } from '@chakra-ui/react';
import Head from 'next/head';

import Header from '../components/header';

import * as constants from '../constants';

export default function About() {
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
          This is a work in progress app designed to help people with their
          mental health. The goal is to examine and help to reframe negative
          thought patterns. It uses AI to do so, so the results cannot be
          guaranteed to be as good as a human therapist. Please reach out for
          professional help if you need it, this is not a substitute.
        </Text>
      </Container>
    </>
  );
}
