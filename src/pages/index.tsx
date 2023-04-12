import { Button, Container, HStack, Heading, Stack } from '@chakra-ui/react';

import { Distortions } from '../components/distortions';

import { useEffect, useState } from 'react';

import Disclaimer from '@/components/disclaimer';
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
        sections: [
          {
            heading: 'What is it?',
            body: v.info,
          },
          {
            heading: 'How might I have used it?',
            body: v.why,
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
  const [disclaimerAccepted, setDisclaimedAccepted] = useState(false);
  const [maintenance, setMaintenance] = useState(
    process.env.NEXT_PUBLIC_MAINTENANCE !== 'false'
  );
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const ws = new WebSocket(
      'wss://bnu9qu2vxb.execute-api.us-east-1.amazonaws.com/dev'
    );

    ws.onopen = () => {
      setWs(ws);
    };
    ws.onclose = () => console.log('close');
    ws.onerror = (err) => console.log(err);

    const existingEvent = localStorage.getItem('eventText') || '';
    const existingThought = localStorage.getItem('thoughtText') || '';

    if (existingEvent !== '') {
      setEventText(existingEvent);
    }

    if (existingThought !== '') {
      setThoughtText(existingThought);
    }
  }, []);

  useEffect(() => {
    if (eventText !== '') {
      localStorage.setItem('eventText', eventText);
    }

    if (thoughtText !== '') {
      localStorage.setItem('thoughtText', thoughtText);
    }
  }, [eventText, thoughtText]);

  const showExample = function () {
    setEventText(constants.site.example.event);
    setThoughtText(constants.site.example.thought);
  };

  const analyse = function () {
    setLoading(true);

    ws?.send(JSON.stringify({ eventText, thoughtText }));

    if (ws) {
      ws.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.message?.includes('timed out')) {
          return;
        }
        setLoaded(true);
        setLoading(false);
        setResponse(JSON.parse(data.choices[0].message.content));
      };
    }
  };

  const restart = function () {
    setEventText('');
    setThoughtText('');
    setLoaded(false);
    setResponse(null);
  };

  const mainBody = () => {
    if (!disclaimerAccepted) {
      return (
        <Container rounded={'xl'} p={0} maxW={{ sm: '90%', md: '80%' }}>
          <Disclaimer
            disclaimerAccepted={disclaimerAccepted}
            setDisclaimerAccepted={setDisclaimedAccepted}
          ></Disclaimer>
        </Container>
      );
    }

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
