import { SimpleGrid, Stack, useHighlight } from '@chakra-ui/react';

import {
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  CardBody,
  CardFooter,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Divider,
  Heading,
  Tooltip,
  Textarea,
  Mark,
  Link,
  Text,
} from '@chakra-ui/react';

import { QuestionIcon } from '@chakra-ui/icons';

import { useState } from 'react';

import { DistortionProps, DistortionsProps } from '@/types';

export function Distortions(
  props: DistortionsProps & {
    thought?: string;
    event?: string;
    feedbackUrl?: string;
  }
) {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackLoading, setFeedbackLoading] = useState<boolean>(false);

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

  const sendFeedback = async () => {
    setFeedbackLoading(true);
    const payload = { ...props, feedbackComment };
    await fetch(`${props.feedbackUrl}/feedback` as string, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    setFeedbackModalOpen(false);
    setFeedbackLoading(false);
  };

  return (
    <>
      <Modal
        isCentered={true}
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        size={'2xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Provide feedback to us</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              We're sorry this reponse was not helpful to you. We're commited to
              listening to user feedback and improving the application to give
              the best help to our users.
            </Text>
            <Text mt={5}>
              You can report this to us (with an optional comment) and we'll
              look into it.
            </Text>
            <Text fontWeight={'bold'} mt={5}>
              By reporting we will be able to see both your input and the
              provided response, but this will be anonymous.
            </Text>
            <Textarea
              mt={5}
              isDisabled={feedbackLoading}
              value={feedbackComment}
              onChange={(ev) => setFeedbackComment(ev.target.value)}
              placeholder="Help us to understand where we went wrong (optional)"
            ></Textarea>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={sendFeedback}
              isLoading={feedbackLoading}
              colorScheme="blue"
              mr={3}
            >
              Submit feedback
            </Button>
            <Button
              isDisabled={feedbackLoading}
              onClick={() => setFeedbackModalOpen(false)}
              variant="ghost"
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack spacing={2}>
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <GridItem rowSpan={1} colSpan={{ sm: 4, md: 3 }}>
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
                      <span style={{ mixBlendMode: 'plus-lighter' }}>
                        {text}
                      </span>
                    </Mark>
                  </Tooltip>
                );
              })}
            </Heading>
          </GridItem>
          <GridItem rowSpan={1} colSpan={{ sm: 4, md: 1 }}>
            <Stack alignItems={'flex-end'}>
              <Button
                leftIcon={<QuestionIcon />}
                colorScheme="orange"
                variant="solid"
                onClick={() => setFeedbackModalOpen(true)}
                maxW={'220px'}
                mb={5}
              >
                Was this unhelpful?
              </Button>
            </Stack>
          </GridItem>
        </Grid>
        <SimpleGrid
          minChildWidth={{ sm: 'fit-content', md: '300px' }}
          spacing="15px"
        >
          {props.distortions.map((distortion: DistortionProps, i) => {
            return <Distortion key={i} {...distortion} />;
          })}
        </SimpleGrid>
      </Stack>
    </>
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
