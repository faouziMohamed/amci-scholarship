'use client';

import { Link } from '@chakra-ui/next-js';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

import { HOME_PAGE, PROFILE_PAGE, SIGN_IN_PAGE } from '@/lib/client-route';
import { capitalize } from '@/lib/utils';

import { CkAcemLogo } from '@/Components/CkAcemLogo';
import { acemSocials } from '@/Repository/static-data';

export default function Header() {
  const { status } = useSession();
  return (
    <Box
      as='header'
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
        <Link href={HOME_PAGE}>
          <CkAcemLogo w='7rem' h='7rem' p={0} m={0} flexShrink='0' />
        </Link>
        <Text as='h2' fontWeight='600' fontSize='1.6rem'>
          Association des Comoriens Étudiant au Maroc
        </Text>
      </Flex>
      <Flex justifyContent='flex-end' alignItems='center' gap='0.5rem'>
        {status === 'authenticated' ? (
          <Button as={Link} href={PROFILE_PAGE} colorScheme='gray'>
            Profile
          </Button>
        ) : (
          <Button as={Link} href={SIGN_IN_PAGE} colorScheme='gray'>
            Se connecter
          </Button>
        )}
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
    </Box>
  );
}
