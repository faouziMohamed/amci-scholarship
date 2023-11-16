import { getUserNotificationsRoute } from '@/lib/server-route';

import { AppUserWithToken, PaginatedNotifications } from '@/types/app.types';

export const DEFAULT_PAGINATED_NOTIFICATION = {
  notifications: [],
  totalNotifications: 0,
  totalPages: 0,
  nextPage: 0,
  pageSize: 0,
  currentCount: 0,
};

export async function getAllUserNotifications(user: AppUserWithToken) {
  const { token, id } = user;
  const response = await fetch(getUserNotificationsRoute(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let notif: PaginatedNotifications = DEFAULT_PAGINATED_NOTIFICATION;
  if (response.ok) {
    notif = (await response.json()) as PaginatedNotifications;
  }
  return notif;
}
