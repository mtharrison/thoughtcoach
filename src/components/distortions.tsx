import {
  Flex,
  Heading,
  Link,
  Spacer,
  Box,
  SimpleGrid,
  Show,
  Badge,
  Stack,
} from "@chakra-ui/react";
import NextLink from "next/link";

import * as constants from "../constants";

import Distortion from "./distortion";

export default function Distortions({ response }: { response: any }) {
  return (
    <Stack spacing={3}>
      <SimpleGrid minChildWidth={{ sm: "200px", md: "300px" }} spacing="20px">
        {Object.entries(response.distortions).map(([key, val], i) => {
          return (
            <Distortion
              key={i}
              data={{ key, why: val.why, reframe: val.reframe, info: val.info }}
            />
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
