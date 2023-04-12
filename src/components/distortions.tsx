import { SimpleGrid, Stack } from '@chakra-ui/react';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';

import { DistortionProps, DistortionsProps } from '@/types';

export function Distortions(props: DistortionsProps) {
  return (
    <Stack spacing={2}>
      <SimpleGrid minChildWidth={{ sm: '300px', md: '300px' }} spacing="15px">
        {props.distortions.map((distortion: DistortionProps, i) => {
          return <Distortion key={i} {...distortion} />;
        })}
      </SimpleGrid>
    </Stack>
  );
}

export default function Distortion(props: DistortionProps) {
  console.log(props);
  return (
    <Card
      borderTopColor={props.color}
      borderTopWidth="15px"
      borderTopRadius="lg"
      boxShadow="lg"
    >
      <CardBody>
        <Stack spacing="3">
          <Heading color="headingColor1" size="md" mb={3}>
            {props.name}
          </Heading>
          {props.sections.map(({ heading, body }, i: number) => {
            return (
              <Box key={i}>
                <Heading key={i} color="headingColor1" size="sm" mb={2}>
                  {heading}
                </Heading>
                <Text>{body}</Text>
                {i !== props.sections.length - 1 && <Divider pt={4} />}
              </Box>
            );
          })}
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button size="sm" colorScheme="blue">
          <Link
            // @ts-ignore
            href={props.link}
            target="blank"
          >
            Read more
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
