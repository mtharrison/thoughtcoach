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
  console.log(data);
  return (
    <Card
      // @ts-ignore
      borderTopColor={constants.site.distortions[data.key]}
      borderTopWidth="10px"
      borderTopRadius="lg"
      boxShadow="lg"
    >
      <CardBody>
        <Stack mt="" spacing="3">
          <Heading size="md">{data.key}</Heading>
          <Text>{data.info}</Text>
          <Divider />
          <Text>{data.why}</Text>
          <Text>{data.reframe}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button size="sm" colorScheme="gray">
          <Link
            href="https://en.wikipedia.org/wiki/Cognitive_distortion#Main_types"
            target="blank"
          >
            Read more
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
