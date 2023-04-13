import { Box, Button, Flex, Text, Textarea } from '@chakra-ui/react';

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
            <Text fontWeight={'bold'} fontSize="xl">
              What happened?
            </Text>
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
        bg={'gray.100'}
        border={0}
        color={'gray.700'}
      />
      <Box>
        <Text fontWeight={'bold'} fontSize="xl">
          What was the automatic negative thought?
        </Text>
        <Text fontSize="sm">
          Often following a difficult situation we tell ourselves a negative
          story, dig deep to uncover your self-talk following the event.
        </Text>
      </Box>
      <Textarea
        isDisabled={loading}
        minH={170}
        bg={'gray.100'}
        border={0}
        color={'gray.700'}
        onChange={(ev) => setThoughtText(ev.target.value)}
        value={thoughtText}
      />
      <Button
        isLoading={loading}
        onClick={analyse}
        colorScheme="blue"
        bg="highlight"
        size="md"
        w="auto"
      >
        Submit
      </Button>
      {loading && (
        <Text>Response can take up to a minute, please be patient</Text>
      )}
    </>
  );
}
