/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { Link } from '@chakra-ui/next-js';
import {
  Alert,
  AlertIcon,
  Avatar,
  chakra,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  StackProps,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { BsFillPinAngleFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa6';
import { GiPositionMarker } from 'react-icons/gi';
import { MdOutlineWork } from 'react-icons/md';

import { capitalize, capitalizeEachWord } from '@/lib/utils';

import { UserSpecificScholarshipCodes } from '@/Components/app/UserSpecificScholarshipCodes';
import { ElevatedContainer } from '@/Components/ElevatedContainer';
import { acemSocials } from '@/Repository/static-data';

import cover from '~/images/cover_4.jpg';

import { AppUserWithToken, userRoleValue } from '@/types/app.types';

const NextImage = chakra(Image, {
  shouldForwardProp: (prop) => ['width', 'height', 'src', 'alt'].includes(prop),
});
export default function ProfilePage() {
  const { data: session } = useSession();
  const { user } = session!;

  const avatarSrc = user.avatarUrl;
  const role = userRoleValue[user.role];
  return (
    <VStack h='100%' w='100%' py='2rem' overflowY='auto' spacing='1rem'>
      <VStack
        textAlign='start'
        width='100%'
        maxW='90rem'
        mx='auto'
        alignItems='flex-start'
        px='1rem'
        spacing={10}
      >
        <Text as='h1' fontSize='1.5rem' fontWeight={600}>
          Profile
        </Text>

        <ElevatedContainer
          h='19rem'
          overflow='hidden'
          isolation='isolate'
          p={0}
        >
          <ProfileUserAvatarWithDetailsOnCover
            src={avatarSrc || ''}
            name={user.name}
            role={role}
          />
          <ProfileCover alt={user.name} />
          <HStack w='100%' bgColor='#fff'>
            <Tabs
              position='relative'
              variant='line'
              align='end'
              w='100%'
              boxShadow='none'
              border='none'
              roundedBottom='md'
            >
              <TabList border='none' fontWeight={500}>
                <Tab gap='0.3rem'>
                  <Icon as={FaUser} />
                  <Text>Profile</Text>
                </Tab>
              </TabList>
              <TabIndicator
                mt='-1.5px'
                height='2px'
                bg='blue.500'
                borderRadius='1px'
              />
              {/* <TabPanels> */}
              {/*  <TabPanel> */}
              {/*    <p>one!</p> */}
              {/*  </TabPanel> */}
              {/* </TabPanels> */}
            </Tabs>
          </HStack>
        </ElevatedContainer>
      </VStack>

      <ProfilePageContent user={user} />
    </VStack>
  );
}

function ProfilePageContent({ user }: { user: AppUserWithToken }) {
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

function ProfileBlockContainer(props: { children: ReactNode } & StackProps) {
  const { children, ...rest } = props;
  return (
    <Stack
      px={{ base: '1rem', lg: 0 }}
      py={{ lg: '0.2rem' }}
      w='100%'
      gap='1rem'
      {...rest}
    >
      {children}
    </Stack>
  );
}

function ProfileCover({ alt }: { alt: string }) {
  return (
    <NextImage
      zIndex={-1}
      position='absolute'
      inset={0}
      filter='saturate(0.5) contrast(1.2) brightness(0.7)'
      src={cover}
      alt={alt}
      w='100%'
      h='100%'
      rounded='2xl'
      objectFit='cover'
      objectPosition='center'
      color='white'
      bgColor='primary.dark'
    />
  );
}

function ProfileUserAvatarWithDetailsOnCover({
  name,
  role,
  src,
}: {
  src?: string;
  name: string;
  role: string;
}) {
  return (
    <Stack h='100%' w='100%' alignItems='center' justifyContent='center'>
      <Avatar size='lg' src={src} name={name} border='2px solid #eee' />
      <Stack w='100%' spacing={1} alignItems='center'>
        <Heading
          color='#fff'
          as='h1'
          fontSize='1.2rem'
          fontWeight={600}
          py={0}
          px='0.3rem'
          m={0}
          textAlign='center'
        >
          {capitalizeEachWord(name)}
        </Heading>
        <Text fontSize='0.8rem' fontWeight={500} color='gray.100'>
          {role}
        </Text>
      </Stack>
    </Stack>
  );
}
