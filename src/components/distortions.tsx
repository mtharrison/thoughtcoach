import { SimpleGrid, Stack } from '@chakra-ui/react';

import Distortion from './distortion';

interface res {
  why: string;
  reframe: string;
  info: string;
}

export default function Distortions({ response }: { response: any }) {
  return (
    <Stack spacing={3}>
      <SimpleGrid minChildWidth={{ sm: '300px', md: '300px' }} spacing="20px">
        {Object.entries(response.distortions).map(([key, val], i) => {
          return (
            <Distortion
              key={i}
              data={{
                key,
                why: (val as res).why,
                reframe: (val as res).reframe,
                info: (val as res).info,
              }}
            />
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
