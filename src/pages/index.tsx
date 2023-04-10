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
      <Container
        maxW="80rem"
        justifyContent="center"
        height="100vh"
        centerContent
      >
        <Heading>Down for Maintenance</Heading>
      </Container>
    </>
  );
}
