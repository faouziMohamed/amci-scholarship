import { Dispatch, SetStateAction } from 'react';

import {
  WS_ALL_NOTIFICATION,
  WS_ARE_READ_NOTIFICATION,
  WS_ONE_NOTIFICATION,
} from '@/lib/server-route';
import {
  atLeastOneNotifIsNotRead,
  crateWebsocketConnection,
} from '@/lib/utils';

import { AppNotification, PaginatedNotifications } from '@/types/app.types';

type UpdatedReadNotificationAck = {
  notificationIds: number[];
  message: string | null;
};

export function handleSocketComunications(
  setPaginatedNotif: Dispatch<SetStateAction<PaginatedNotifications>>,
  setIsDirty: Dispatch<SetStateAction<boolean>>,
) {
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
      setPaginatedNotif((n) => ({
        ...n,
        notifications: [body, ...n.notifications],
        totalNotifications: n.totalNotifications + 1,
        currentCount: n.currentCount + 1,
      }));
      setIsDirty(!body.isRead);
    });

    client.subscribe(WS_ARE_READ_NOTIFICATION, (message) => {
      const bodyStr = message.body;
      const body = JSON.parse(bodyStr) as UpdatedReadNotificationAck;
      setPaginatedNotif((oldNotifications) => {
        const updatedNotif = updateReadStatusToTrue(oldNotifications, body);
        return { ...oldNotifications, notifications: updatedNotif };
      });
    });
  });
  return client;
}

function updateReadStatusToTrue(
  oldNotif: PaginatedNotifications,
  body: UpdatedReadNotificationAck,
) {
  return oldNotif.notifications.map((n) => {
    if (body.notificationIds.includes(n.id)) {
      return { ...n, isRead: true };
    }
    return n;
  });
}
