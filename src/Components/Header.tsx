'use client';

import { Link } from '@chakra-ui/next-js';
import { chakra, Flex, Text } from '@chakra-ui/react';

import { capitalize } from '@/lib/utils';

import { acemSocials } from '@/Repository/static-data';

import AcemLogo from '~/logo/acem-logo.svg';

const CkAcemLogo = chakra(AcemLogo);
export default function Header() {
  return (
    <chakra.header
      gap='1rem'
      display='flex'
      flexDirection='column'
      py='1rem'
      px='1.5rem'
      bg='#005A87'
      color='whiteAlpha.800'
    >
      <Flex
        w='100%'
        alignItems='center'
        justifyContent='center'
        gap='1rem'
        textAlign='center'
      >
        <CkAcemLogo w='7rem' h='7rem' p={0} m={0} flexShrink='0' />
        <Text as='h2' fontWeight='600' fontSize='1.6rem'>
          Association des Comoriens Étudiant au Maroc
        </Text>
      </Flex>
      <Flex justifyContent='flex-end' alignItems='center' gap='0.5rem'>
        {Object.entries(acemSocials).map(([title, social]) => (
          <Link
            key={social.link}
            href={social.link}
            aria-label={`Link to our ${capitalize(title)}`}
            title={`Link to our ${capitalize(title)}`}
          >
            <social.Icon fontSize='1.5rem' />
          </Link>
        ))}
      </Flex>
    </chakra.header>
  );
}
