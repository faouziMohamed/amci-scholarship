'use client';

import { Box, Menu, MenuList, Stack, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

import { MenuButtonIcon } from '@/app/(app)/topNavbar/MenuButtonIcon';
import { NotificationDot } from '@/app/(app)/topNavbar/NotificationDot';
import { NotificationLine } from '@/app/(app)/topNavbar/NotificationLine';
import { useNotificationsSocket } from '@/app/(app)/topNavbar/UseNotificationsSocket';

export function NotificationBell() {
  const { data: session } = useSession();
  const { user } = session!;
  const { paginatedNotif, setIsDirty, isDirty } = useNotificationsSocket(user);

  return (
    <Menu id='navbar-notification-menu'>
      <Box id='notification-menu-icon' position='relative'>
        <MenuButtonIcon
          setIsDirty={setIsDirty}
          paginatedNotification={paginatedNotif}
          user={user}
        />
        {isDirty && <NotificationDot />}
      </Box>
      <MenuList
        maxH='80vh'
        overflowY='auto'
        maxW='500px'
        w='100%'
        py={0}
        as={Stack}
        gap='0.1rem'
      >
        {paginatedNotif.notifications.length === 0 && (
          <Stack py='5rem' px='2rem'>
            <Text fontWeight={400} alignItems='center'>
              Pas de notifications disponibles pour le moment (-_-)
            </Text>
          </Stack>
        )}
        {paginatedNotif.notifications.map((notification) => (
          <NotificationLine key={notification.id} notification={notification} />
        ))}
      </MenuList>
    </Menu>
  );
}
