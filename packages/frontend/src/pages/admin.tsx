import { Container, Link, Text } from '@chakra-ui/react';

import Layout from '@/components/layout';

export async function getServerSideProps() {
  const ADMIN_URL = process.env.ADMIN_URL;

  return {
    props: {
      ADMIN_URL,
    },
    redirect: {
      destination: `${ADMIN_URL}/auth/google/authorize`,
      permanent: false,
    },
  };
}

export default function Admin(props: any) {
  return (
    <Layout>
      <Container variant={'main'}>
        <Text>Admin {props.ADMIN_URL}</Text>
      </Container>
    </Layout>
  );
}
