import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Container,
  Button,
  Stack,
  Box,
  HStack,
  Heading,
} from "@chakra-ui/react";

import Header from "../components/header";
import Distortions from "../components/distortions";

import { use, useState } from "react";

import * as constants from "../constants";
import Reframe from "@/components/reframe";
import Input from "@/components/input";
import Alert from "@/components/alert";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [eventText, setEventText] = useState("");
  const [thoughtText, setThoughtText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [maintenance, setMaintenance] = useState(
    process.env.NEXT_PUBLIC_MAINTENANCE !== "false"
  );
  const [error, setError] = useState("");

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
    } catch (err: any) {
      console.log(err);
      setError(err.toString());
    }
  };

  const restart = function () {
    setEventText("");
    setThoughtText("");
    setLoaded(false);
    setResponse(null);
  };

  const renderActive = () => {
    return (
      <>
        <Head>
          <title>{constants.site.name}</title>
          <meta name="description" content={constants.site.description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container p={0} h="100%" w="100%" maxW="100%">
          <Alert isOpen={error != ""} message={error}></Alert>
          <Box p={3} bg="#554480">
            <Header />
            <Container
              maxW={{ sm: "100%", md: "60%" }}
              centerContent
              mt={10}
              mb={10}
            >
              <Heading
                color="headingColor"
                textAlign="center"
                lineHeight="10"
                size="xl"
              >
                Change your perspective, change your world: The app that helps
                you reframe negative thoughts.
              </Heading>
            </Container>
          </Box>
          <Container>
            <HStack
              justifyContent="flex-end"
              my={5}
              maxW={{ sm: "90%", md: "80%" }}
            >
              <Button onClick={restart} colorScheme="blue" size="sm" w="4xs">
                Start again
              </Button>
              {!loaded && (
                <Button
                  variant="outline"
                  colorScheme="blue"
                  size="sm"
                  w="4xs"
                  onClick={showExample}
                >
                  Show me an example
                </Button>
              )}
            </HStack>
          </Container>
          <Container
            boxShadow="lg"
            borderRadius="lg"
            mt={5}
            bg="white"
            p={10}
            maxW={{ sm: "90%", md: "80%" }}
          >
            <Stack spacing={5}>
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
            {loaded && <Distortions response={response} />}
          </Container>
        </Container>
      </>
    );
  };

  const renderMaintenance = () => {
    return (
      <>
        <Head>
          <title>{constants.site.name}</title>
          <meta name="description" content={constants.site.description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container justifyContent="center" centerContent h="100vh" maxW="80rem">
          <Heading>
            This app is down for maintenance until further notice.
          </Heading>
        </Container>
      </>
    );
  };

  if (maintenance) {
    return renderMaintenance();
  }

  return renderActive();
}
