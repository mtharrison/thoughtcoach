import { Flex, Heading, Link, Spacer, Show, Badge } from "@chakra-ui/react";

import * as constants from "../constants";

export default function Header() {
  return (
    <Flex w="100%" alignItems="center" gap="2" py={5}>
      <Heading size="lg">
        {constants.site.name}{" "}
        <Badge p={1} colorScheme="purple">
          BETA
        </Badge>
      </Heading>
      <Spacer />
      <Show above="md">
        <Link>About</Link>
        <Link>Privacy</Link>
        <Link>Contact</Link>
      </Show>
    </Flex>
  );
}
