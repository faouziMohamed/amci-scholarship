'use client';

import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ImportHistoryTable } from '@/app/(app)/dashboard/ImportHistoryTable';
import { OverViewImportHistory } from '@/app/(app)/dashboard/OverViewImportHistory';
import { useCopyToClipBoardToast } from '@/Components/componentFactory';
import { getImportHistory } from '@/Services/codes.service';

import { AppStats, AppUserWithToken, ImportHistory } from '@/types/app.types';

export function HistoryImport({
  user,
  stats,
}: {
  user: AppUserWithToken;
  stats: AppStats;
}) {
  const [isLoadingImportHistory, setIsLoadingImportHistory] = useState(false);
  const [importHistory, setImportHistory] = useState<ImportHistory[]>([]);
  const toast = useCopyToClipBoardToast();

  useEffect(() => {
    setIsLoadingImportHistory(true);
    void getImportHistory(user.token)
      .then((fetchedImportHistory) => {
        setImportHistory(fetchedImportHistory);
        return fetchedImportHistory;
      })
      .catch(() => {
        toast({
          title: "Erreur de chargement de l'historique des imports",
          description: 'Veuillez réessayer plus tard',
          status: 'error',
        });
      })
      .finally(() => setIsLoadingImportHistory(false));
  }, [toast, user.token]);

  return (
    <Flex
      w='100%'
      flexDirection={{ base: 'column', xlg: 'row-reverse' }}
      gap='1.5rem'
      alignItems={{ base: 'center', xlg: 'stretch' }}
      justifyContent='center'
      id='history-import'
    >
      <ImportHistoryTable
        isLoadingImportHistory={isLoadingImportHistory}
        importHistory={importHistory}
      />
      <OverViewImportHistory stats={stats} />
    </Flex>
  );
}
