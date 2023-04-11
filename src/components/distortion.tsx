import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';

import * as constants from '../constants';

export default function Distortion({ data }: { data: any }) {
  return (
    <Card
      // @ts-ignore
      borderTopColor={constants.site.distortions[data.key].color}
      borderTopWidth="10px"
      borderTopRadius="lg"
      boxShadow="lg"
    >
      <CardBody>
        <Stack spacing="3">
          <Heading color="headingColor1" size="md">
            {data.key}
          </Heading>
          <Divider></Divider>
          <Heading color="headingColor1" size="sm" pt={3}>
            What is it?
          </Heading>
          <Text>{data.info}</Text>
          <Divider></Divider>
          <Heading color="headingColor1" size="sm" pt={3}>
            How might I have used it?
          </Heading>
          <Text>{data.why}</Text>
          <Divider></Divider>
          <Heading color="headingColor1" size="sm" pt={3}>
            What's a different perspective?
          </Heading>
          <Text>{data.reframe}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button size="sm" colorScheme="blue">
          <Link
            // @ts-ignore
            href={constants.site.distortions[data.key].link as string}
            target="blank"
          >
            Read more
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
