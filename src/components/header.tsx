import {
  Flex,
  Heading,
  Link,
  Spacer,
  Show,
  Badge,
  Box,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import mypic from "../../public/logo.png";

import Disclaimer from "../components/disclaimer";

import * as constants from "../constants";

export default function Header() {
  return (
    <Flex alignItems="center" gap="2" p={3} mb={5}>
      <Image src={mypic} alt="Logo" width={100} height={100} />
      <Link
        textAlign={{ sm: "center", md: "left" }}
        w={{ sm: "100%", md: "auto" }}
        as={NextLink}
        href="/"
      >
        <Heading size="xl" color="headingColor1">
          {constants.site.name}{" "}
          <Badge p={1} colorScheme="blue">
            BETA
          </Badge>
        </Heading>
      </Link>

      <Spacer />
      <Show above="md">
        <Link
          color="headingColor2"
          px={2}
          textDecoration="underline"
          as={NextLink}
          href="/about"
        >
          About
        </Link>
        <Link
          color="headingColor"
          px={2}
          textDecoration="underline"
          as={NextLink}
          href="/privacy"
        >
          Privacy
        </Link>
        <Link
          color="headingColor"
          px={2}
          textDecoration="underline"
          as={NextLink}
          href="/contact"
        >
          Contact
        </Link>
      </Show>
    </Flex>
  );
}
