import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Container,
  Button,
  Stack,
  Box,
  Highlight,
  HStack,
  Heading,
} from "@chakra-ui/react";

import Header from "../components/header";
import Distortions from "../components/distortions";

import { use, useState, useEffect } from "react";

import * as constants from "../constants";
import Reframe from "@/components/reframe";
import Input from "@/components/input";
import Alert from "@/components/alert";
import Disclaimer from "@/components/disclaimer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [eventText, setEventText] = useState("");
  const [thoughtText, setThoughtText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [disclaimerAccepted, setDisclaimedAccepted] = useState(false);
  const [maintenance, setMaintenance] = useState(
    process.env.NEXT_PUBLIC_MAINTENANCE !== "false"
  );
  const [error, setError] = useState("");

  useEffect(() => {
    const existingEvent = localStorage.getItem("eventText") || "";
    const existingThought = localStorage.getItem("thoughtText") || "";

    if (eventText === "" && existingEvent !== "") {
      setEventText(existingEvent);
    }

    if (thoughtText === "" && existingThought !== "") {
      setThoughtText(existingThought);
    }
  }, []);

  useEffect(() => {
    if (eventText !== "") {
      localStorage.setItem("eventText", eventText);
    }

    if (thoughtText !== "") {
      localStorage.setItem("thoughtText", thoughtText);
    }
  }, [eventText, thoughtText]);

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

  const mainBody = () => {
    if (!disclaimerAccepted) {
      return (
        <Container rounded={"xl"} p={0} maxW={{ sm: "90%", md: "80%" }}>
          <Disclaimer
            disclaimerAccepted={disclaimerAccepted}
            setDisclaimerAccepted={setDisclaimedAccepted}
          ></Disclaimer>
        </Container>
      );
    }

    return (
      <>
        <Container rounded={"xl"} p={0} maxW={{ sm: "90%", md: "80%" }}>
          <HStack
            boxShadow="lg"
            borderRadius="lg"
            w="fit-content"
            p={5}
            bg={"gray.50"}
          >
            <Button onClick={restart} colorScheme="blue" size="sm">
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
          mb={40}
          bg={"gray.50"}
          rounded={"xl"}
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
      </>
    );
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
          <Alert
            isOpen={error != ""}
            dialogClose={() => {
              setError("");
              setLoading(false);
            }}
          ></Alert>
          <Box p={3} bg="headerBlockColor">
            <Header />
            <Container
              maxW={{ sm: "100%", md: "60%" }}
              centerContent
              mt={10}
              mb={10}
            >
              <Heading
                color="headingColor1"
                textAlign="center"
                lineHeight="tall"
                size="xl"
              >
                <Highlight
                  query={["perspective", "life"]}
                  styles={{
                    color: "highlight",
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
          {mainBody()}
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
