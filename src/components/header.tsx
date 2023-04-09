import { Flex, Heading, Link, Spacer, Show, Badge } from "@chakra-ui/react";
import NextLink from "next/link";

import * as constants from "../constants";

export default function Header() {
  return (
    <Flex w="100%" alignItems="center" gap="2" py={5}>
      <Link as={NextLink} href="/">
        <Heading size="lg">
          {constants.site.name}{" "}
          <Badge p={1} colorScheme="purple">
            BETA
          </Badge>
        </Heading>
      </Link>

      <Spacer />
      <Show above="md">
        <Link as={NextLink} href="/about">
          About
        </Link>
        <Link as={NextLink} href="/privacy">
          Privacy
        </Link>
        <Link as={NextLink} href="/contact">
          Contact
        </Link>
      </Show>
    </Flex>
  );
}
