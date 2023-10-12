import { AppUserWithToken } from '@/types/app.types';

declare module 'next-auth' {
  interface Session {
    user: AppUserWithToken;
  }
}

declare module 'next-auth/jwt' {
  type JWT = AppUserWithToken;
}
