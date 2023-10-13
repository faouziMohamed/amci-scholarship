import { STATS_ROUTE } from '@/lib/server-route';

import { AppStats } from '@/types/app.types';

export async function getStats(token: string) {
  const url = STATS_ROUTE;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Une erreur est survenue pendant la requête');
  }

  return (await response.json()) as AppStats;
}
