/* eslint-disable @typescript-eslint/no-misused-promises */

import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { PROFILE_PAGE } from '@/lib/client-route';
import { log } from '@/lib/utils';

import { authOptions } from '@/app/api/auth/[...nextauth]/nextAuthOptions';
import { LoginForm } from '@/Components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Se connecter | Code de bourse',
  description: 'Se connecter à Code de bourse pour gérer votre compte',
  keywords: 'se connecter, connexion, code de bourse',
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    log('User already logged in, redirecting to profile page');
    return redirect(PROFILE_PAGE);
  }
  return <LoginForm redirectTo={PROFILE_PAGE} />;
}
