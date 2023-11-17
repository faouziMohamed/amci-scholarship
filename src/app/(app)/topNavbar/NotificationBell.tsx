'use client';

import {
  Box,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { MdNotifications } from 'react-icons/md';

import { SOME_READ_NOTIFICATION_ROUTE } from '@/lib/server-route';

import { NotificationDot } from '@/app/(app)/topNavbar/NotificationDot';
import { NotificationLine } from '@/app/(app)/topNavbar/NotificationLine';
import { useNotificationsSocket } from '@/app/(app)/topNavbar/UseNotificationsSocket';

export function NotificationBell() {
  const { data: session } = useSession();
  const { user } = session!;
  const { paginatedNotif, setIsDirty, isDirty } = useNotificationsSocket(user);

  return (
    <Menu>
      <Box id='notification-menu-icon' position='relative'>
        <MenuButton
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => {
            setIsDirty(false);
            const notifIds = paginatedNotif.notifications
              .filter((n) => !n.isRead)
              .map((n) => n.id);
            if (notifIds.length > 0) {
              const body = { notificationIds: notifIds, read: true };
              await fetch(SOME_READ_NOTIFICATION_ROUTE, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(body),
              });
            }
          }}
          as={IconButton}
          aria-label='Options'
          variant='ghost'
          position='relative'
          rounded='full'
          icon={
            <Icon
              rounded='full'
              bgColor='primary.50'
              fontSize='2.5rem'
              p='0.2rem'
              as={MdNotifications}
            />
          }
        />
        {isDirty && <NotificationDot />}
      </Box>
      <MenuList maxW='500px' w='100%' py={0} as={Stack} gap='0.1rem'>
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
