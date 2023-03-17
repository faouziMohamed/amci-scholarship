'use client';

import { Link } from '@chakra-ui/next-js';
import { Box, chakra, Text } from '@chakra-ui/react';
import { AiOutlineRight } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { HiOutlineMail } from 'react-icons/hi';

import { camelCaseToTitleCase, capitalize } from '@/lib/utils';

import UnderlineLink from '@/Components/Links/UnderlineLink';
import { ACEMSocialData, FooterLinkData } from '@/Repository/static-data';

const AngleRight = chakra(AiOutlineRight);
const Location = chakra(GoLocation);
const Email = chakra(HiOutlineMail);

export function FooterTitle({ title }: { title: string }) {
  return (
    <Text
      fontWeight='500'
      pb='1.2rem'
      position='relative'
      as='h3'
      fontSize='1.1rem'
    >
      {camelCaseToTitleCase(title, 'uppercase')}
      <chakra.span
        position='absolute'
        inset={0}
        bottom='0.6rem'
        w='2.5rem'
        borderBlockEnd='3px solid'
        borderBlockEndColor='secondary.light'
      />
    </Text>
  );
}

export function FooterLink({ link }: { link: FooterLinkData }) {
  return (
    <UnderlineLink
      href={link.url}
      color='whiteAlpha.600'
      fontWeight='400'
      fontSize='0.88rem'
      _hover={{ color: 'whiteAlpha.800' }}
      display='flex'
      gap='0.5rem'
      alignItems='center'
    >
      <AngleRight />
      <Box as='span'>{link.name}</Box>
    </UnderlineLink>
  );
}

export function EmailLink() {
  return (
    <UnderlineLink
      href='mailto:acemaroc@gmail.com'
      color='whiteAlpha.600'
      fontWeight='400'
      fontSize='0.88rem'
      _hover={{ color: 'whiteAlpha.800' }}
      display='flex'
      gap='0.5rem'
      alignItems='center'
    >
      <Email w='1.3rem' h='1.2rem' />
      <Box as='span'>acemaroc@gmail.com</Box>
    </UnderlineLink>
  );
}

export function SocialLink({
  social,
  socialName,
}: {
  social: ACEMSocialData;
  socialName: string;
}) {
  return (
    <Link
      href={social.link}
      aria-label={`Link to our ${capitalize(socialName)}`}
      title={`Link to our ${capitalize(socialName)}`}
    >
      <social.Icon />
    </Link>
  );
}

export function AddressLocation() {
  return (
    <Text
      display='flex'
      color='whiteAlpha.600'
      fontWeight='400'
      alignItems='center'
      fontSize='0.88rem'
    >
      <Location display='inline-block' />
      <Box as='span' pl='0.5rem' display='inline-block'>
        Avenue Des FAR - Hay Riad - Rabat Maroc
      </Box>
    </Text>
  );
}
