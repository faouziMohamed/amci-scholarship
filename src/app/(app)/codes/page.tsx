import { Text, VStack } from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { CODES_PAGE, getSignInPageWithNext } from '@/lib/client-route';
import { log } from '@/lib/utils';

import { authOptions } from '@/app/api/auth/[...nextauth]/nextAuthOptions';
import { ImportCodeProcess } from '@/Components/app/ImportCodeProcess';
import { NotAllowedToAccessModalWarning } from '@/Components/modal/NotAllowedToAccessModalWarning';

export default async function CodesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    log('User already logged in, redirecting to profile page');
    const afterRedirectPage = getSignInPageWithNext(CODES_PAGE);
    redirect(afterRedirectPage);
  }
  const { user } = session;
  if (user.role !== 'ADMIN') {
    return <NotAllowedToAccessModalWarning />;
  }
  return (
    <VStack h='100%' py='2rem' overflow='auto'>
      <VStack
        textAlign='start'
        width='100%'
        maxW='90rem'
        mx='auto'
        alignItems='flex-start'
        px='1rem'
        spacing={10}
      >
        <Text as='h1' fontSize='1.5rem' fontWeight={600}>
          Import de nouveaux codes de la bourse
        </Text>
        <ImportCodeProcess />
      </VStack>
    </VStack>
  );
}
