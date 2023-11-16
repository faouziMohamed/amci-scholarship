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
import { useEffect, useState } from 'react';
import { MdNotifications } from 'react-icons/md';

import { WS_ALL_NOTIFICATION, WS_ONE_NOTIFICATION } from '@/lib/server-route';
import {
  atLeastOneNotifIsNotRead,
  crateWebsocketConnection,
} from '@/lib/utils';

import { NotificationDot } from '@/app/(app)/topNavbar/NotificationDot';
import { NotificationLine } from '@/app/(app)/topNavbar/NotificationLine';
import {
  DEFAULT_PAGINATED_NOTIFICATION,
  getAllUserNotifications,
} from '@/Services/notifications.service';

import { AppNotification, PaginatedNotifications } from '@/types/app.types';

export function NotificationBell() {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const [isDirty, setIsDirty] = useState(false);
  const { user } = session!;
  useEffect(() => {
    setMounted(true);
  }, []);

  const [paginatedNotif, setPaginatedNotif] = useState<PaginatedNotifications>(
    DEFAULT_PAGINATED_NOTIFICATION,
  );
  useEffect(() => {
    if (!mounted) return;
    const client = crateWebsocketConnection();
    client.connect({}, () => {
      client.subscribe(WS_ALL_NOTIFICATION, (message) => {
        const bodyStr = message.body;
        const body = JSON.parse(bodyStr) as PaginatedNotifications;
        setPaginatedNotif(body);

        const dirty = atLeastOneNotifIsNotRead(body);
        setIsDirty(dirty);
      });

      client.subscribe(WS_ONE_NOTIFICATION, (message) => {
        const bodyStr = message.body;
        const body = JSON.parse(bodyStr) as AppNotification;
        const newNotif: PaginatedNotifications = {
          ...paginatedNotif,
          notifications: [body, ...paginatedNotif.notifications],
          totalNotifications: paginatedNotif.totalNotifications + 1,
          currentCount: paginatedNotif.currentCount + 1,
        };
        setPaginatedNotif(newNotif);
        setIsDirty(!body.isRead);
      });
    });

    void (async () => {
      const notif = await getAllUserNotifications(user);
      setPaginatedNotif(notif);
    })();

    // eslint-disable-next-line consistent-return
    return () => {
      if (!client?.connected || !mounted) return;
      // eslint-disable-next-line no-console
      client.disconnect(() => console.log('disconnected'));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, user, user.token]);

  return (
    <Menu>
      <Box id='notification-menu-icon' position='relative'>
        <MenuButton
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
