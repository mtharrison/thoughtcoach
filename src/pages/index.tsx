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
  Link,
  Card,
  CardBody,
  Heading,
  Divider,
  CardFooter,
  Spacer,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";

import Header from "../components/header";

import { useState } from "react";

import * as constants from "../constants";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [eventText, setEventText] = useState("");
  const [thoughtText, setThoughtText] = useState("");

  const showExample = function () {
    setEventText(constants.site.example.event);
    setThoughtText(constants.site.example.thought);
  };

  const analyse = async function () {
    try {
      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventText, thoughtText }),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

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
        <HStack>
          <Button colorScheme="blue" size="sm" w="4xs">
            Start again
          </Button>
          <Button
            variant="outline"
            colorScheme="blue"
            size="sm"
            w="4xs"
            onClick={showExample}
          >
            Show me an example
          </Button>
        </HStack>
        <Grid w="100%" templateColumns="60% 1fr" mt="5" gap={5}>
          <GridItem
            borderRadius="md"
            boxShadow="lg"
            bg="white"
            p={5}
            colSpan={{ sm: 2, lg: 1 }}
          >
            <Stack spacing={5}>
              <Box>
                <Flex gap={5}>
                  <Box>
                    <Text fontSize="xl">What happened?</Text>
                    <Text fontSize="sm">
                      Try to explain in as much detail as you can an event that
                      occured that led you to have negative emotions. Explain
                      like you would to a friend.
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Textarea
                minH={150}
                onChange={(ev) => setEventText(ev.target.value)}
                value={eventText}
              />
              <Box>
                <Text fontSize="xl">
                  What was the automatic negative thought?
                </Text>
                <Text fontSize="sm">
                  Often following a difficult situation we tell ourselves a
                  negative story, dig deep to uncover your self-talk following
                  the event. It might be something like "they must think I'm an
                  idiot after doing that"
                </Text>
              </Box>
              <Textarea
                minH={150}
                onChange={(ev) => setThoughtText(ev.target.value)}
                value={thoughtText}
              />
              <Button onClick={analyse} colorScheme="blue" size="md" w="xs">
                Ok, I'm ready for some feedback
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
          <GridItem borderRadius="md" colSpan={{ sm: 2, lg: 1 }}>
            <Stack spacing={3}>
              <Heading size="sm">
                Cognitive Distortions{" "}
                <Link
                  href="https://en.wikipedia.org/wiki/Cognitive_distortion#Main_types"
                  target="blank"
                  textDecoration="underline"
                >
                  (what is this?)
                </Link>
              </Heading>
              <Card
                borderTopColor="pink.200"
                borderTopWidth="10px"
                borderTopRadius="lg"
              >
                <CardBody>
                  <Stack mt="" spacing="3">
                    <Heading size="md">Personalisation</Heading>
                    <Text>
                      Personalization is when you take something personally that
                      is not really about you. In this case, the you are
                      assuming that the other driver's behavior was a direct
                      reflection of your own worth and character.
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Button size="sm" colorScheme="gray">
                    Read more about Personalisation
                  </Button>
                </CardFooter>
              </Card>

              <Card
                borderTopColor="yellow.200"
                borderTopWidth="10px"
                borderTopRadius="lg"
              >
                <CardBody>
                  <Stack mt="" spacing="3">
                    <Heading size="md">Emotional Reasoning</Heading>
                    <Text>
                      Emotional reasoning is when you assume your feelings
                      reflect the truth of the situation.
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Button size="sm" colorScheme="gray">
                    Read more about Emotional Reasoning
                  </Button>
                </CardFooter>
              </Card>
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}
