import { Badge, Heading, Link, Wrap, WrapItem } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import mypic from '../../public/logo.png';

import * as constants from '../constants';

export default function Header() {
  return (
    <Wrap justify="space-between">
      <WrapItem alignItems="center">
        <Image src={mypic} alt="Logo" width={100} height={100} />
        <Link
          textAlign={{ sm: 'center', md: 'left' }}
          w={{ sm: '100%', md: 'auto' }}
          as={NextLink}
          href="/"
        >
          <Heading size="xl" color="headingColor1">
            {constants.site.name}{' '}
            <Badge p={1} colorScheme="blue">
              BETA
            </Badge>
          </Heading>
        </Link>
      </WrapItem>

      <WrapItem height="fit-content" p={5}>
        {/* <Link
          color="headingColor2"
          px={2}
          textDecoration="underline"
          as={NextLink}
          href="/about"
        >
          About
        </Link> */}
        {/* <Link
          color="headingColor"
          px={2}
          textDecoration="underline"
          as={NextLink}
          href="/privacy"
        >
          Privacy
        </Link> */}

        {constants.site.sponsorship && (
          <Link
            color="headingColor"
            px={2}
            textDecoration="underline"
            fontWeight={'bold'}
            as={NextLink}
            href="https://www.patreon.com/ThoughtCoach/membership"
          >
            Sponsor Development
          </Link>
        )}
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
      </WrapItem>
    </Wrap>
  );
}
