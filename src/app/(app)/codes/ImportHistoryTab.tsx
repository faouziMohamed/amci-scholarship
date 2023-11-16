import { Alert, AlertIcon, Stack, Text } from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { CODES_PAGE, getSignInPageWithNext } from '@/lib/client-route';
import { log } from '@/lib/utils';

import { ImportHistoryTable } from '@/app/(app)/dashboard/ImportHistoryTable';
import { authOptions } from '@/app/api/auth/[...nextauth]/nextAuthOptions';
import { getImportHistory } from '@/Services/codes.service';

export async function ImportHistoryTab() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    log('The user need to be logged in to access this page');
    return redirect(getSignInPageWithNext(CODES_PAGE));
  }
  const { user } = session;

  const importHistory = await getImportHistory(user.token);

  return (
    <Stack w='100%'>
      <Alert status='info' w='fit-content' alignItems='flex-start'>
        <AlertIcon />
        <Text fontSize='0.9rem'>
          Cette table affiche l&apos;historique des imports de codes de la
          bourse, elle sera mise à jour à chaque import.
        </Text>
      </Alert>
      <ImportHistoryTable
        isLoadingImportHistory={false}
        importHistory={importHistory}
      />
    </Stack>
  );
}
