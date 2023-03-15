import { Link } from '@chakra-ui/next-js';
import { chakra, Flex, Heading, Stack } from '@chakra-ui/react';
import { FaFacebookF } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { TfiYoutube } from 'react-icons/tfi';

import AcemLogo from '~/logo/acem-logo.svg';

const CkAcemLogo = chakra(AcemLogo, {
  shouldForwardProp(prop: string): boolean {
    return ['className', 'style'].includes(prop);
  },
});

export default function Header() {
  return (
    <Stack
      spacing='1rem'
      as='header'
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
        <CkAcemLogo w='6rem' h='7rem' p={0} m={0} flexShrink='0' />
        <Heading as='h2' fontSize='1.2rem'>
          Association des Comoriens Étudiant au Maroc
        </Heading>{' '}
      </Flex>
      <Flex justifyContent='flex-end' alignItems='center' gap='0.5rem'>
        <Link href='https://www.facebook.com/acem.ma'>
          <FaFacebookF />
        </Link>
        <Link href='https://www.instagram.com/acem.ma'>
          <RiInstagramFill />
        </Link>
        {/* youtube */}
        <Link href='https://www.youtube.com/cha'>
          <TfiYoutube />
        </Link>
      </Flex>
    </Stack>
  );
}
