import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import {
  handleLoginRequest,
  handleUserRegistration,
} from '@/Services/auth.service';

import { AuthSignIn, RegistrationBody } from '@/types/app.types';

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'emil' },
        password: { label: 'Password', type: 'password' },
        action: { label: 'Login', type: 'submit' },
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      async authorize(credentials) {
        if (!credentials) throw new Error('No credentials provided');
        if (!credentials.email) throw new Error('No email provided');
        if (!credentials.password) throw new Error('No password provided');
        if (!credentials.action)
          throw new Error('No action provided, aborting');
        const cred = credentials as AuthSignIn;
        if (cred.action !== 'SIGN_IN' && cred.action !== 'SIGN_UP')
          throw new Error('Action non reconnue, utilisez SIGN_IN ou SIGN_UP');
        if (cred.action === 'SIGN_IN') {
          return handleLoginRequest(cred);
        }
        const credReg = credentials as unknown as RegistrationBody;
        return handleUserRegistration(credReg);
      },
    }),
  ],
  callbacks: {
    jwt({ token, session, user = {}, trigger }) {
      if (trigger === 'update') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return { ...token, ...user, ...session };
      }
      return { ...token, ...user };
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    session({ session, token }) {
      const now = Date.now();

      const expiration = new Date(token.tokenExpirationDate).getTime();
      if (now > expiration) {
        // token expired, return null to invalidate session
        return null;
      }

      session.user = token;
      return session;
    },
  },
};
