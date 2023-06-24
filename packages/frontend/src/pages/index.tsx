import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

import { Distortions } from '../components/distortions';

import { useEffect, useState, useRef } from 'react';

import Input from '@/components/input';
import Layout from '@/components/layout';
import {
  AnalyseResponse,
  DistortionsProps,
  DistortionsResponse,
  ClassificationResponse,
} from '@/types';
import * as constants from '../constants';

export async function getServerSideProps() {
  return {
    props: {
      COMPLETION_API_WSS_URL: process.env.COMPLETION_API_WSS_URL,
      MAINTENANCE_MODE: process.env.MAINTENANCE_MODE,
      FEEDBACK_URL: process.env.FEEDBACK_URL,
    },
  };
}

function marshalDistortions(response: DistortionsResponse): DistortionsProps {
  const keys = Object.keys(response.distortions)
    .filter((k) => constants.site.distortions[k] !== undefined)
    .filter((k) => response.distortions[k].confidence > 75);

  const res = {
    distortions: keys.map((k) => {
      const d = constants.site.distortions[k];
      const v = response.distortions[k];
      return {
        name: k,
        color: d.color,
        link: d.link,
        spans: v.spans,
        sections: [
          {
            heading: 'What is it?',
            body: v.info,
          },
          {
            heading: "What's another way to think about it?",
            body: v.reframe,
          },
        ],
      };
    }),
  };

  return res;
}

export default function Home(props: any) {
  const [eventText, setEventText] = useState('');
  const [thoughtText, setThoughtText] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AnalyseResponse | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [error, setError] = useState('');

  const submitRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const existingEvent = sessionStorage.getItem('eventText') || '';
    const existingThought = sessionStorage.getItem('thoughtText') || '';

    if (existingEvent !== '') {
      setEventText(existingEvent);
    }

    if (existingThought !== '') {
      setThoughtText(existingThought);
    }
  }, []);

  useEffect(() => {
    const ws = new WebSocket(props.COMPLETION_API_WSS_URL as string);

    ws.onopen = () => {
      setWs(ws);
    };
    ws.onclose = () => console.log('close');
    ws.onerror = (err) => console.log(err);

    const existingEvent = sessionStorage.getItem('eventText') || '';
    const existingThought = sessionStorage.getItem('thoughtText') || '';

    if (existingEvent !== '') {
      setEventText(existingEvent);
    }

    if (existingThought !== '') {
      setThoughtText(existingThought);
    }
  }, []);

  const showExample = function () {
    const i = Math.floor(Math.random() * constants.site.examples.length);
    setEventText(constants.site.examples[i].event);
    setThoughtText(constants.site.examples[i].thought);
    submitRef &&
      submitRef.current &&
      submitRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const analyse = function () {
    setLoading(true);

    ws?.send(
      JSON.stringify({ action: 'completion', body: { eventText, thoughtText } })
    );

    if (ws) {
      ws.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.message?.includes('timed out')) {
          return;
        }
        setLoaded(true);
        setLoading(false);
        setResponse(data);
      };
    }
  };

  const restart = function () {
    setEventText('');
    setThoughtText('');
    setLoaded(false);
    setResponse(null);
    sessionStorage.removeItem('thoughtText');
    sessionStorage.removeItem('eventText');
    submitRef &&
      submitRef.current &&
      submitRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const mainBody = () => {
    return (
      <>
        <Container variant={'min'}>
          <HStack>
            <Button
              disabled={loading}
              onClick={restart}
              colorScheme="blue"
              size="sm"
            >
              Start again
            </Button>
            {!loaded && (
              <Button
                variant="outline"
                colorScheme="blue"
                size="sm"
                w="4xs"
                onClick={showExample}
              >
                Show me an example...
              </Button>
            )}
          </HStack>
        </Container>
        <Container variant={'main'}>
          <Stack spacing={5}>
            {!loaded && (
              <Input
                eventText={eventText}
                setEventText={setEventText}
                thoughtText={thoughtText}
                setThoughtText={setThoughtText}
                analyse={analyse}
                loading={loading}
                submitRef={submitRef}
              />
            )}
          </Stack>
          {loaded &&
            response !== null &&
            (response as ClassificationResponse).classification && (
              <>
                <Heading mb={5} size={'lg'}>
                  Your input is a{' '}
                  {(response as ClassificationResponse).classification} input.
                </Heading>
                <Text mb={5} size={'sm'}>
                  {(response as ClassificationResponse).reasoning}
                </Text>
                <Text mb={5} size={'sm'}>
                  Cognitive distortions are irrational, exaggerated, or
                  unhelpful thought patterns that have the potential to
                  negatively impact our mental and emotional well-being. These
                  thinking patterns tend to be automatic in nature and can lead
                  to distorted interpretations of events or experiences,
                  resulting in heightened distress, anxiety, or depressive
                  symptoms. By recognizing and addressing these cognitive
                  distortions, individuals can gradually improve their thinking
                  patterns and develop healthier, more balanced perspectives.
                </Text>
              </>
            )}
          {loaded &&
            response !== null &&
            (response as DistortionsResponse).distortions && (
              <>
                <Box>
                  <Heading mb={5} size={'lg'}>
                    Advice
                  </Heading>
                  <Text mb={5} size={'sm'}>
                    {(response as DistortionsResponse).advice}
                  </Text>
                </Box>
                <Distortions
                  feedbackUrl={props.FEEDBACK_URL}
                  showFeedbackButton={true}
                  thought={thoughtText}
                  event={eventText}
                  {...marshalDistortions(response as DistortionsResponse)}
                />
              </>
            )}
        </Container>
      </>
    );
  };

  const renderActive = () => {
    return <Layout>{mainBody()}</Layout>;
  };

  const renderMaintenance = () => {
    return (
      <Layout>
        <Container justifyContent="center" centerContent h="100vh" maxW="80rem">
          <Heading>
            This app is down for maintenance until further notice.
          </Heading>
        </Container>
      </Layout>
    );
  };

  if (props.MAINTENANCE_MODE === 'true') {
    return renderMaintenance();
  }

  return renderActive();
}
