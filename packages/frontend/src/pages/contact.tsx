import { Container, Link, Text } from '@chakra-ui/react';

import Layout from '@/components/layout';

export default function Contact() {
  return (
    <Layout>
      <Container variant={'main'}>
        <Text>
          For any feedback please use the{' '}
          <Link
            textDecoration="underline"
            href="https://forms.gle/f6kiJpADhrGi2SQSA"
          >
            Google Form here.
          </Link>{' '}
          Inlcude an email address if you would like a reply.
        </Text>
      </Container>
    </Layout>
  );
}
