import { Button, Container, HStack, Heading, Stack } from '@chakra-ui/react';

import Distortions from '../components/distortions';

import { useEffect, useState } from 'react';

import Disclaimer from '@/components/disclaimer';
import Input from '@/components/input';
import Layout from '@/components/layout';
import * as constants from '../constants';

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
  const [error, setError] = useState('');

  useEffect(() => {
    const existingEvent = localStorage.getItem('eventText') || '';
    const existingThought = localStorage.getItem('thoughtText') || '';

    if (eventText === '' && existingEvent !== '') {
      setEventText(existingEvent);
    }

    if (thoughtText === '' && existingThought !== '') {
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

  const analyse = async function () {
    setLoading(true);
    try {
      const res = await fetch('/api/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventText, thoughtText }),
      });
      const data = await res.json();

      setLoaded(true);
      setLoading(false);
      setResponse(data);
    } catch (err: any) {
      console.log(err);
      setError(err.toString());
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
            <Button onClick={restart} colorScheme="blue" size="sm">
              Clear Input
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
          {loaded && <Distortions response={response} />}
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
