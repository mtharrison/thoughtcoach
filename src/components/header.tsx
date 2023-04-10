import { Flex, Heading, Link, Spacer, Show, Badge } from "@chakra-ui/react";
import NextLink from "next/link";

import * as constants from "../constants";

export default function Header() {
  return (
    <Flex alignItems="center" gap="2" p={3} mb={5}>
      <Link
        textAlign={{ sm: "center", md: "left" }}
        w={{ sm: "100%", md: "auto" }}
        as={NextLink}
        href="/"
      >
        <Heading size="xl" color="headingColor">
          {constants.site.name}{" "}
          <Badge p={1} colorScheme="purple">
            BETA
          </Badge>
        </Heading>
      </Link>

      <Spacer />
      <Show above="md">
        <Link
          color="headingColor"
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
