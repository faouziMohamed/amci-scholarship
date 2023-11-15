import { Link } from '@chakra-ui/next-js';
import {
  Alert,
  AlertIcon,
  Flex,
  Heading,
  Icon,
  Stack,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsFillPinAngleFill } from 'react-icons/bs';
import { GiPositionMarker } from 'react-icons/gi';
import { MdOutlineWork } from 'react-icons/md';

import { capitalize } from '@/lib/utils';

import { UserSpecificScholarshipCodes } from '@/app/(app)/profile/UserSpecificScholarshipCodes';
import { ElevatedContainer } from '@/Components/ElevatedContainer';
import { acemSocials } from '@/Repository/static-data';

import { AppUserWithToken } from '@/types/app.types';

export function ProfilePageContent({ user }: { user: AppUserWithToken }) {
  return (
    <VStack
      textAlign='start'
      width='100%'
      maxW='90rem'
      mx='auto'
      flexDirection={{ base: 'column', lg: 'row' }}
      alignItems={{ lg: 'flex-start' }}
      gap='1rem'
    >
      <ProfileBlockContainer flexBasis='45%' pl={{ lg: '1rem' }}>
        <ElevatedContainer>
          <Heading fontSize='1rem' as='h2'>
            A propos
          </Heading>
          <Text fontSize='0.8rem' fontWeight={400}>
            {user.description || 'Aucune description Fournie'}
          </Text>
          <Flex gap='0.5rem'>
            <Icon fontSize='1rem' as={MdOutlineWork} />
            <Text as='span' fontSize='0.8rem' pl='0.2rem' lineHeight='0.9rem'>
              {user.profession || 'Aucune profession renseignée'}
            </Text>
          </Flex>
        </ElevatedContainer>
        <ElevatedContainer>
          <Heading fontSize='1rem' as='h2'>
            Contact de l&apos;ACEM
          </Heading>
          <Stack>
            {Object.entries(acemSocials).map(([title, social]) => (
              <Link
                key={social.link}
                href={social.link}
                aria-label={`Link to our ${capitalize(title)}`}
                title={`Link to our ${capitalize(title)}`}
                display='flex'
                alignItems='center'
                gap='0.2rem'
              >
                <social.Icon />
                {social.handle}
              </Link>
            ))}
            <Text fontSize='0.8rem' fontWeight={400}>
              L’ACEM (Association des Comoriens Étudiant au Maroc), crée le 31
              Décembre 1981 à Casablanca, est une organisation à but non
              lucratif qui a comme ambition de regrouper en son sein tous
              étudiants et stagiaires comoriens au Maroc et ayant comme devise:
              <Text as='span' fontWeight='500'>
                Egalité - Solidarité - Excellence.
              </Text>
            </Text>
          </Stack>
          <Flex gap='0.1rem'>
            <Icon fontSize='1rem' as={GiPositionMarker} />
            <Text as='span' fontSize='0.8rem' pl='0.2rem' lineHeight='0.9rem'>
              Avenue Des FAR - Hay Riad - Rabat Maroc
            </Text>
          </Flex>
        </ElevatedContainer>
      </ProfileBlockContainer>
      <ProfileBlockContainer
        pr={{ lg: '1rem' }}
        flexGrow={1}
        overflowX={{ lg: 'auto' }}
      >
        <ElevatedContainer>
          <Alert
            as={ElevatedContainer}
            alignItems='flex-start'
            flexDirection='row'
            rounded='md'
            status='success'
          >
            <AlertIcon />
            <Text>
              Vous êtes parmi les premiers à utiliser cette plateforme, nous ne
              manquerons pas de vous informer de l&apos;évolution de cette
              plateforme.
            </Text>
          </Alert>

          <Alert
            as={ElevatedContainer}
            alignItems='flex-start'
            flexDirection='row'
            rounded='md'
            status='info'
          >
            <AlertIcon />
            <Text>
              Vous receverais des notifications personels ici et dans un futur
              proche vous pourrez{' '}
              <Text as='span' color='primary.main' fontWeight={500}>
                communiquer avec d&apos;autres membres
              </Text>{' '}
              du plateforme
            </Text>
          </Alert>
          <Alert
            as={ElevatedContainer}
            alignItems='flex-start'
            flexDirection='row'
            rounded='md'
            status='warning'
            colorScheme='twitter'
          >
            <AlertIcon />
            <Text>Vos retours nous seront du plus grand plaisir!</Text>
          </Alert>
        </ElevatedContainer>
        <ElevatedContainer px='0.2rem'>
          <Heading px='1rem' fontSize='1rem' as='h2'>
            <Icon as={BsFillPinAngleFill} />
            <Text pl='0.5rem' as='span'>
              Les 5 Derniers codes de la bourse
            </Text>
          </Heading>
          <UserSpecificScholarshipCodes user={user} />
        </ElevatedContainer>
      </ProfileBlockContainer>
    </VStack>
  );
}

function ProfileBlockContainer(
  props: {
    children: ReactNode;
  } & StackProps,
) {
  const { children, ...rest } = props;
  return (
    <Stack
      px={{ base: '1rem', lg: 0 }}
      py={{ lg: '0.2rem' }}
      w='100%'
      gap='1rem'
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </Stack>
  );
}
