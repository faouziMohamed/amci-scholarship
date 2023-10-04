// make sure the user is logged in before allowing them to access the page they requested

import Cors from 'cors';
import { expressWrapper } from 'next-connect';

import { SITE_URL } from '@/lib/client-route';

export const apiMiddleware = expressWrapper(corsMiddleware());

export function corsMiddleware() {
  return Cors({
    methods: ['GET'],
    origin: SITE_URL,
    credentials: false,
  });
}
