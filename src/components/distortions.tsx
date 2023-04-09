import {
  Flex,
  Heading,
  Link,
  Spacer,
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
      <Heading size="sm">
        Cognitive Distortions{" "}
        <Link
          href="https://en.wikipedia.org/wiki/Cognitive_distortion#Main_types"
          target="blank"
          textDecoration="underline"
        >
          (what is this?)
        </Link>
      </Heading>

      {Object.entries(response.step1.distortions).map(([key, val], i) => {
        return (
          <Distortion key={i} data={{ key, val, spans: response.step2[key] }} />
        );
      })}
    </Stack>
  );
}
