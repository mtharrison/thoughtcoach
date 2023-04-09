import { Box, Text, Divider } from "@chakra-ui/react";

export default function Reframe({ response }: { response: any }) {
  return (
    <Box>
      <Text fontSize="xl">Here's an alternative way to think about this:</Text>
      <Text fontSize="sm">
        Also consider some of the possible cognitive distortions identified, and
        how they might have impacted your emotions
      </Text>
      <Divider mt={5}></Divider>
      <Text mt={5}>{response.step1.reframe}</Text>
    </Box>
  );
}
