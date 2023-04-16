import Layout from '../components/layout';
import { Container, Heading, Text } from '@chakra-ui/react';

import { Distortions } from '../components/distortions';
import { DistortionsProps } from '@/types';
import * as constants from '../constants';

function marshalDistortions(reference: any): DistortionsProps {
  return {
    distortions: Object.entries(constants.site.distortions).map(
      ([key, val]) => {
        return {
          name: key,
          link: val.link,
          color: val.color,
          sections: [
            { heading: 'What is it?', body: val.description },
            { heading: 'An example', body: val.example },
          ],
        };
      }
    ),
  };
}

export default function CognitiveDistortions() {
  return (
    <Layout>
      <Container variant={'main'}>
        <Heading mb={5} size={'lg'}>
          What are Cognitive Distortions?
        </Heading>
        <Text mb={5} size={'sm'}>
          Cognitive distortions are irrational, exaggerated, or unhelpful
          thought patterns that have the potential to negatively impact our
          mental and emotional well-being. These thinking patterns tend to be
          automatic in nature and can lead to distorted interpretations of
          events or experiences, resulting in heightened distress, anxiety, or
          depressive symptoms. By recognizing and addressing these cognitive
          distortions, individuals can gradually improve their thinking patterns
          and develop healthier, more balanced perspectives.
        </Text>
        <Text mb={5} size={'sm'}>
          Here are a list of common cognitive distortions with examples:
        </Text>
        <Distortions
          showFeedbackButton={false}
          {...marshalDistortions(constants.site.distortions)}
        />
      </Container>
    </Layout>
  );
}
