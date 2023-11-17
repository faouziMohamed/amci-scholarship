import { useEffect, useState } from 'react';

import { atLeastOneNotifIsNotRead } from '@/lib/utils';

import { handleSocketComunications } from '@/app/(app)/topNavbar/HandleSocketComunications';
import {
  DEFAULT_PAGINATED_NOTIFICATION,
  getAllUserNotifications,
} from '@/Services/notifications.service';

import { AppUserWithToken, PaginatedNotifications } from '@/types/app.types';

export function useNotificationsSocket(user: AppUserWithToken) {
  const [mounted, setMounted] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [paginatedNotif, setPaginatedNotif] = useState<PaginatedNotifications>(
    DEFAULT_PAGINATED_NOTIFICATION,
  );
  useEffect(() => {
    if (!mounted) return;
    const client = handleSocketComunications(setPaginatedNotif, setIsDirty);
    // eslint-disable-next-line consistent-return
    return () => {
      if (!client?.connected || !mounted) return;
      // eslint-disable-next-line no-console
      client.disconnect(() => console.log('Socket connextion closed'));
    };
  }, [mounted]);
  useEffect(() => {
    if (!mounted) return;
    void (async () => {
      const notif = await getAllUserNotifications(user);
      const dirty = atLeastOneNotifIsNotRead(notif);
      setIsDirty(dirty);
      setPaginatedNotif(notif);
    })();
  }, [mounted, user]);
  return { paginatedNotif, isDirty, setIsDirty };
}
