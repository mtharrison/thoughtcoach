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
import Distortions from "../components/distortions";

import { use, useState } from "react";

import * as constants from "../constants";
import Reframe from "@/components/reframe";
import Input from "@/components/input";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [eventText, setEventText] = useState("");
  const [thoughtText, setThoughtText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const showExample = function () {
    setEventText(constants.site.example.event);
    setThoughtText(constants.site.example.thought);
  };

  const analyse = async function () {
    setLoading(true);
    try {
      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventText, thoughtText }),
      });
      const data = await res.json();

      setLoaded(true);
      setLoading(false);
      setResponse(data);
    } catch (err) {
      console.log(err);
    }
  };

  const restart = function () {
    setEventText("");
    setThoughtText("");
    setLoaded(false);
    setResponse(null);
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
          <Button onClick={restart} colorScheme="blue" size="sm" w="4xs">
            Start again
          </Button>
          <Button
            variant="outline"
            colorScheme="blue"
            size="sm"
            w="4xs"
            onClick={showExample}
          >
            I don't get it, show me an example
          </Button>
        </HStack>
        <Grid w="100%" templateColumns="50% 1fr" mt="5" gap={5}>
          <GridItem
            borderRadius="md"
            boxShadow="lg"
            bg="white"
            p={5}
            colSpan={{ sm: 2, lg: 1 }}
          >
            <Stack spacing={5}>
              {loaded && <Reframe response={response} />}
              {!loaded && (
                <Input
                  eventText={eventText}
                  setEventText={setEventText}
                  thoughtText={thoughtText}
                  setThoughtText={setThoughtText}
                  analyse={analyse}
                  loading={loading}
                />
              )}
            </Stack>
          </GridItem>
          <GridItem borderRadius="md" colSpan={{ sm: 2, lg: 1 }}>
            {loaded && <Distortions response={response} />}
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}
