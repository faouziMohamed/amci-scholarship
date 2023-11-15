'use client';

import { Avatar, HStack, Icon, IconButton } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { BiMenu, BiSolidUserCircle } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { MdNotifications } from 'react-icons/md';

import {
  useSidebarContext,
  useSidebarMediaQueryIsSmallScreen,
} from '@/Components/react-contexts/SidebarContextProvider';

export function AppTopBar() {
  const { toggle } = useSidebarContext();
  const { data: session } = useSession();
  const isSmallScreen = useSidebarMediaQueryIsSmallScreen();
  const { user } = session!;
  return (
    <HStack
      justifyContent={!isSmallScreen ? 'flex-end' : 'space-between'}
      w='100%'
      py='0.5rem'
      px='1rem'
    >
      {isSmallScreen && (
        <IconButton
          onClick={toggle}
          icon={<BiMenu />}
          bgColor='primary.100'
          fontSize='1.5rem'
          rounded='md'
          aria-label='Side bar toggle button'
        />
      )}

      <HStack spacing={5}>
        <Icon
          bgColor='primary.100'
          fontSize='2rem'
          p='0.2rem'
          rounded='md'
          as={MdNotifications}
        />
        <HStack
          px='0.4rem'
          py='0.2rem'
          rounded='5rem'
          bgColor='blackAlpha.200'
          cursor='pointer'
          _hover={{
            bgColor: 'primary.400',
            '& :is(.settings-icon)': { color: 'primary.50' },
          }}
          spacing={2}
        >
          <Avatar
            size='sm'
            name={user.name}
            icon={<BiSolidUserCircle fontSize='1.2rem' />}
            src={user.avatarUrl || ''}
          />
          <Icon
            color='primary.400'
            fontSize='1.2rem'
            as={FiSettings}
            className='settings-icon'
          />
        </HStack>
      </HStack>
    </HStack>
  );
}
