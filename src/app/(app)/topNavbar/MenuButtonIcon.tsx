import { Icon, IconButton, MenuButton } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { MdNotifications } from 'react-icons/md';

import { SOME_READ_NOTIFICATION_ROUTE } from '@/lib/server-route';

import { AppUserWithToken, PaginatedNotifications } from '@/types/app.types';

export function MenuButtonIcon(props: {
  setIsDirty: Dispatch<SetStateAction<boolean>>;
  paginatedNotification: PaginatedNotifications;
  user: AppUserWithToken;
}) {
  const { setIsDirty, paginatedNotification, user } = props;
  return (
    <MenuButton
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={async () => {
        setIsDirty(false);
        const notifIds = paginatedNotification.notifications
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
  );
}
