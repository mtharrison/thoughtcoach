import {
  Badge,
  Button,
  Heading,
  Link,
  Wrap,
  WrapItem,
  Show,
} from '@chakra-ui/react';
import { RiHandHeartFill } from 'react-icons/ri';
import Image from 'next/image';
import NextLink from 'next/link';
import logo from '../../public/logo.png';

import Content from 'content';

import * as constants from '../constants';

export default function Header() {
  return (
    <Wrap justify="space-between">
      <WrapItem alignItems="center">
        <Image src={logo} alt="Logo" width={100} height={100} />
        <Link
          textAlign={{ sm: 'center', md: 'left' }}
          w={{ sm: '100%', md: 'auto' }}
          as={NextLink}
          href="/"
        >
          <Heading size="xl" color="headingColor1">
            {Content.general.siteName}{' '}
            <Badge p={1} colorScheme="blue">
              BETA
            </Badge>
          </Heading>
        </Link>
      </WrapItem>

      <Show above={'md'}>
        <WrapItem height="fit-content" alignItems={'center'} p={5}>
          <Link
            color="headingColor"
            px={2}
            fontWeight={'bold'}
            textDecoration="underline"
            as={NextLink}
            href="/cognitive-distortions"
          >
            Cognitive Distortions
          </Link>

          <Link
            color="headingColor"
            px={2}
            fontWeight={'bold'}
            textDecoration="underline"
            as={NextLink}
            href="/contact"
          >
            Contact
          </Link>
          {constants.site.sponsorship && (
            <Button
              minW={'auto'}
              px={3}
              py={2}
              ml={3}
              fontWeight={'bold'}
              bg={'highlight'}
              shadow={'sm'}
              leftIcon={<RiHandHeartFill />}
              color={'white'}
              rounded={'lg'}
              as={NextLink}
              target="_external"
              href="https://buy.stripe.com/cN2g2U3ol5069gc7ss"
            >
              Support us
            </Button>
          )}
        </WrapItem>
      </Show>
    </Wrap>
  );
}
