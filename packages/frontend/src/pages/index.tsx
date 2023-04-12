import { Button, Container, HStack, Heading, Stack } from '@chakra-ui/react';

import { Distortions } from '../components/distortions';

import { useEffect, useState } from 'react';

import Input from '@/components/input';
import Layout from '@/components/layout';
import { AnalyseResponse, DistortionsProps } from '@/types';
import * as constants from '../constants';

function marshalDistortions(response: AnalyseResponse): DistortionsProps {
  const keys = Object.keys(response.distortions).filter(
    (k) => constants.site.distortions[k] !== undefined
  );

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

  console.log(res);

  return res;
}

export default function Home() {
  const [eventText, setEventText] = useState('');
  const [thoughtText, setThoughtText] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [maintenance, setMaintenance] = useState(
    process.env.NEXT_PUBLIC_MAINTENANCE !== 'false'
  );
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL as string);

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

  useEffect(() => {
    if (eventText !== '') {
      sessionStorage.setItem('eventText', eventText);
    }

    if (thoughtText !== '') {
      sessionStorage.setItem('thoughtText', thoughtText);
    }
  }, [eventText, thoughtText]);

  const showExample = function () {
    setEventText(constants.site.example.event);
    setThoughtText(constants.site.example.thought);
  };

  const analyse = function () {
    setLoading(true);

    ws?.send(JSON.stringify({ route: 'completion', eventText, thoughtText }));

    if (ws) {
      ws.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.message?.includes('timed out')) {
          return;
        }
        setLoaded(true);
        setLoading(false);
        setResponse(JSON.parse(data[0].message.content));
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
                Show me an example
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
              />
            )}
          </Stack>
          {loaded && (
            <Distortions
              thought={thoughtText}
              event={eventText}
              {...marshalDistortions(response as unknown as AnalyseResponse)}
            />
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

  if (maintenance) {
    return renderMaintenance();
  }

  return renderActive();
}
