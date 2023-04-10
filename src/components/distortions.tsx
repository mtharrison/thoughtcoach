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
      <SimpleGrid minChildWidth="300px" spacing="20px">
        {Object.entries(response.step1.distortions).map(([key, val], i) => {
          return (
            <Distortion
              key={i}
              data={{ key, val, spans: response.step2[key] }}
            />
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
