/* eslint-disable react/jsx-props-no-spreading */

'use client';

import {
  HStack,
  Icon,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { FaUser } from 'react-icons/fa6';

import { ProfileCover } from '@/app/(app)/profile/ProfileCover';
import { ProfilePageContent } from '@/app/(app)/profile/ProfilePageContent';
import { ProfileUserAvatarWithDetailsOnCover } from '@/app/(app)/profile/ProfileUserAvatarWithDetailsOnCover';
import { ElevatedContainer } from '@/Components/ElevatedContainer';

import { userRoleValue } from '@/types/app.types';

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
