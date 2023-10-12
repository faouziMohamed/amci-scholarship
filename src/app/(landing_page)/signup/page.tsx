import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { PROFILE_PAGE } from '@/lib/client-route';
import { log } from '@/lib/utils';

import { authOptions } from '@/app/api/auth/[...nextauth]/nextAuthOptions';
import { RegisterForm } from '@/Components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Activation de compte',
  description: 'Activer votre compte pour accéder à votre espace personnel',
  keywords: 'activation, compte, espace, personnel',
};
export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    log('User already logged in, redirecting to profile page');
    return redirect(PROFILE_PAGE);
  }
  return <RegisterForm redirectTo={PROFILE_PAGE} />;
}
