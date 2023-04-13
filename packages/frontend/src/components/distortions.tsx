import { SimpleGrid, Stack, useHighlight } from '@chakra-ui/react';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Tooltip,
  Mark,
  Link,
  Text,
} from '@chakra-ui/react';

import { DistortionProps, DistortionsProps } from '@/types';

export function Distortions(
  props: DistortionsProps & { thought?: string; event?: string }
) {
  const spans: string[] = [];
  const spanLookup: { [key: string]: { color: string; name: string }[] } = {};

  for (const d of props.distortions) {
    if (d.spans) {
      for (const span of d.spans) {
        spanLookup[span] = spanLookup[span] || [];
        spanLookup[span].push({ color: d.color, name: d.name });
        if (!spans.includes(span)) {
          spans.push(span);
        }
      }
    }
  }

  const chunks = useHighlight({
    text: props.thought || '',
    query: spans,
  });

  const bgBuilder = (colors: string[]) => {
    const interval = Math.floor(100 / colors.length);
    const regions = colors.flatMap((c, i) => {
      return [`${c} ${i * interval}%`, `${c} ${(i + 1) * interval}%`];
    });

    return `linear-gradient(90deg, ${regions.join(',')})`;
  };

  return (
    <Stack spacing={2}>
      <Heading size={'md'} lineHeight="10" borderTopRadius="lg" mb={5}>
        {chunks.map(({ match, text }, i) => {
          if (!match) return text;
          return (
            <Tooltip
              key={i}
              rounded={'md'}
              label={spanLookup[text].map((m) => m.name).join(', ')}
              placement="top"
            >
              <Mark
                whiteSpace={'break-spaces'}
                rounded={'md'}
                bg={bgBuilder(spanLookup[text].map((m) => m.color))}
                color="white"
                fontWeight={'bold'}
                px="1"
                py="1"
              >
                <span style={{ mixBlendMode: 'plus-lighter' }}>{text}</span>
              </Mark>
            </Tooltip>
          );
        })}
      </Heading>
      <SimpleGrid
        minChildWidth={{ sm: 'fit-content', md: '300px' }}
        spacing="15px"
      >
        {props.distortions.map((distortion: DistortionProps, i) => {
          return <Distortion key={i} {...distortion} />;
        })}
      </SimpleGrid>
    </Stack>
  );
}

export default function Distortion(props: DistortionProps) {
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
            Read more on Wikipedia
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
