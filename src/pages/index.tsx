import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Highlight,
  Stack,
} from "@chakra-ui/react";
import { Inter } from "next/font/google";
import Head from "next/head";

import Distortions from "../components/distortions";
import Header from "../components/header";

import { useEffect, useState } from "react";

import Alert from "@/components/alert";
import Disclaimer from "@/components/disclaimer";
import Input from "@/components/input";
import * as constants from "../constants";

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
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const ws = new WebSocket(
      "wss://bnu9qu2vxb.execute-api.us-east-1.amazonaws.com/dev"
    );

    ws.onopen = () => {
      setWs(ws);
    };
    ws.onclose = () => console.log("close");
    ws.onerror = (err) => console.log(err);

    const existingEvent = localStorage.getItem("eventText") || "";
    const existingThought = localStorage.getItem("thoughtText") || "";

    if (existingEvent !== "") {
      setEventText(existingEvent);
    }

    if (existingThought !== "") {
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

  const analyse = function () {
    setLoading(true);

    ws?.send(JSON.stringify({ eventText, thoughtText }));

    if (ws) {
      ws.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.message?.includes("timed out")) {
          return;
        }
        setLoaded(true);
        setLoading(false);
        setResponse(JSON.parse(data.choices[0].message.content));
      };
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
          <Alert isOpen={error != ""} message={error}></Alert>
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
