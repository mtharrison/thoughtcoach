import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Container,
  Button,
  Grid,
  GridItem,
  Text,
  Stack,
  Box,
  Textarea,
  HStack,
  Spacer,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";

import Header from "../components/header";

import * as constants from "../constants";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>{constants.site.name}</title>
        <meta name="description" content={constants.site.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="80rem" centerContent>
        <Header />
        <Grid w="100%" templateColumns="60% 1fr" gap={6} mt={10}>
          <GridItem colSpan={{ sm: 2, lg: 1 }}>
            <Stack spacing={5}>
              <Box>
                <Flex gap={5}>
                  <Box>
                    <Text fontSize="xl">What happened?</Text>
                    <Text fontSize="sm">
                      Try to explain in as much detail as you can an event that
                      occured that led you to have negative emotions
                    </Text>
                  </Box>
                  <Spacer></Spacer>
                  <Stack>
                    <Button colorScheme="blue" size="sm" w="4xs">
                      Start again
                    </Button>
                    <Button
                      variant="outline"
                      colorScheme="blue"
                      size="sm"
                      w="4xs"
                    >
                      Show me an example
                    </Button>
                  </Stack>
                </Flex>
              </Box>
              <Textarea minH={150}></Textarea>
              <Box>
                <Text fontSize="xl">
                  What was the automatic negative thought?
                </Text>
                <Text fontSize="sm">
                  Often following a difficult situation we tell ourselves a
                  negative story, dig deep to uncover your self-talk following
                  the events
                </Text>
              </Box>
              <Textarea minH={150}></Textarea>
              <Button colorScheme="blue" size="sm" w="xs">
                I'm ready for some feedback
              </Button>
              <Box>
                <Text fontSize="xl">
                  Here's an alternative way to think about this:
                </Text>
                <Text fontSize="sm">
                  Also consider some of the possible cognitive distortions
                  identified, and how they might have impacted your emotions
                </Text>
              </Box>
              <Textarea minH={150}></Textarea>
            </Stack>
          </GridItem>
          <GridItem colSpan={{ sm: 2, lg: 1 }} bg="blue.500">
            <Stack spacing={3}>
              <Text fontSize="6xl">(6xl) In love with React & Next</Text>
              <Text fontSize="5xl">(5xl) In love with React & Next</Text>
              <Text fontSize="4xl">(4xl) In love with React & Next</Text>
              <Text fontSize="3xl">(3xl) In love with React & Next</Text>
              <Text fontSize="2xl">(2xl) In love with React & Next</Text>
              <Text fontSize="xl">(xl) In love with React & Next</Text>
              <Text fontSize="lg">(lg) In love with React & Next</Text>
              <Text fontSize="md">(md) In love with React & Next</Text>
              <Text fontSize="sm">(sm) In love with React & Next</Text>
              <Text fontSize="xs">(xs) In love with React & Next</Text>
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}
