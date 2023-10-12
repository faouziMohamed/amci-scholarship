'use client';

import { redirect, usePathname, useRouter } from 'next/navigation';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

import { getSignInPageWithNext } from '@/lib/client-route';

import Loader from '@/Components/loader/Loader';

export default function NextAuthSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function AppSessionWrapper({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (status === 'unauthenticated') {
      void signOut({ redirect: false });
      const afterRedirectPage = getSignInPageWithNext(pathname);
      router.push(afterRedirectPage);
      redirect(afterRedirectPage);
    }
  }, [pathname, router, status]);
  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'unauthenticated') {
    void signOut({ redirect: false });
    redirect(getSignInPageWithNext(pathname));
  }

  return children;
}
