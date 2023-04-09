import { Flex, Box, Text, Textarea, Button } from "@chakra-ui/react";
import NextLink from "next/link";

import * as constants from "../constants";

import Distortion from "./distortion";

export default function Input({
  eventText,
  thoughtText,
  setEventText,
  setThoughtText,
  analyse,
  loading,
}: {
  eventText: string;
  thoughtText: string;
  setEventText: Function;
  setThoughtText: Function;
  analyse: any;
  loading: boolean;
}) {
  return (
    <>
      <Box>
        <Flex gap={5}>
          <Box>
            <Text fontSize="xl">What happened?</Text>
            <Text fontSize="sm">
              Try to explain in as much detail as you can an event that occured
              that led you to have negative emotions. Explain like you would to
              a friend.
            </Text>
          </Box>
        </Flex>
      </Box>
      <Textarea
        minH={170}
        isDisabled={loading}
        onChange={(ev) => setEventText(ev.target.value)}
        value={eventText}
      />
      <Box>
        <Text fontSize="xl">What was the automatic negative thought?</Text>
        <Text fontSize="sm">
          Often following a difficult situation we tell ourselves a negative
          story, dig deep to uncover your self-talk following the event. It
          might be something like "they must think I'm an idiot after doing
          that"
        </Text>
      </Box>
      <Textarea
        isDisabled={loading}
        minH={170}
        onChange={(ev) => setThoughtText(ev.target.value)}
        value={thoughtText}
      />
      <Button
        isLoading={loading}
        onClick={analyse}
        colorScheme="blue"
        size="md"
        w="xs"
      >
        Ok, I'm ready for some feedback
      </Button>
    </>
  );
}
