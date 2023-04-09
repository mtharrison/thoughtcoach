import {
  Heading,
  Link,
  Card,
  CardBody,
  Stack,
  Text,
  Divider,
  Button,
  CardFooter,
} from "@chakra-ui/react";

import * as constants from "../constants";

export default function Distortion({ data }: { data: any }) {
  return (
    <Card
      // @ts-ignore
      borderTopColor={constants.site.distortions[data.key]}
      borderTopWidth="10px"
      borderTopRadius="lg"
    >
      <CardBody>
        <Stack mt="" spacing="3">
          <Heading size="md">{data.key}</Heading>
          {data.spans.map((s: string, i: number) => (
            <Text key={i} borderLeftWidth={3} pl={3} as="cite">
              "{s}"
            </Text>
          ))}
          <Text>{data.val}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button size="sm" colorScheme="gray">
          Read more about:
          <Link
            href="https://en.wikipedia.org/wiki/Cognitive_distortion#Main_types"
            target="blank"
          >
            {" " + data.key}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
