import {
  Box,
  Container,
  Flex,
  Button,
  Heading,
  Link,
  Hide,
  Highlight,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import { RiHandHeartFill } from 'react-icons/ri';
import NextLink from 'next/link';
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
              <VStack spacing={3}>
                <Heading
                  color="headingColor1"
                  textAlign="center"
                  lineHeight="tall"
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
                  size={{ sm: 'xs', md: 'sm', lg: 'md' }}
                  mt={8}
                >
                  {Content.general.strapline.secondary.text}
                </Heading>
              </VStack>
            </Container>
          </Box>
          <main>{children}</main>
          <Hide above={'md'}>
            <Flex
              height="fit-content"
              alignItems={'center'}
              alignContent={'space-between'}
              p={5}
            >
              <Link
                color="headingColor"
                px={2}
                fontWeight={'bold'}
                textDecoration="underline"
                as={NextLink}
                href="/cognitive-distortions"
              >
                Guide to Cognitive Distortions
              </Link>

              <Link
                color="headingColor"
                px={2}
                fontWeight={'bold'}
                textDecoration="underline"
                as={NextLink}
                href="/contact"
              >
                Contact
              </Link>
              {constants.site.sponsorship && (
                <Button
                  minW={'auto'}
                  px={3}
                  py={2}
                  ml={3}
                  fontWeight={'bold'}
                  bg={'highlight'}
                  shadow={'sm'}
                  leftIcon={<RiHandHeartFill />}
                  color={'white'}
                  rounded={'lg'}
                  as={NextLink}
                  target="_external"
                  href="https://buy.stripe.com/cN2g2U3ol5069gc7ss"
                >
                  Support us
                </Button>
              )}
            </Flex>
          </Hide>
        </Container>
      </>
    </>
  );
}
