import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { CODES_PAGE, getSignInPageWithNext } from '@/lib/client-route';
import { log } from '@/lib/utils';

import { ImportCodeProcess } from '@/app/(app)/codes/ImportCodeProcess';
import { ImportHistoryTab } from '@/app/(app)/codes/ImportHistoryTab';
import { authOptions } from '@/app/api/auth/[...nextauth]/nextAuthOptions';
import { NotAllowedToAccessModalWarning } from '@/Components/modal/NotAllowedToAccessModalWarning';

const IMPORT_CODE_TAB = 'import';
const IMPORT_HISTORY_TAB = 'import-history';

const tabIndexes = {
  [IMPORT_CODE_TAB]: 0,
  [IMPORT_HISTORY_TAB]: 1,
} as const;

type TabIndex = (typeof tabIndexes)[keyof typeof tabIndexes];
type TabName = keyof typeof tabIndexes;

type CodePageParams = {
  searchParams?: { tab?: string };
};

export default async function CodesPage({ searchParams }: CodePageParams) {
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
  const index = getCurrentSelectedTabIndex(searchParams);
  return (
    <VStack h='100%' overflow='auto'>
      <VStack
        textAlign='start'
        width='100%'
        maxW='90rem'
        mx='auto'
        alignItems='flex-start'
        px='1rem'
        spacing={10}
      >
        <Tabs
          index={index}
          isLazy
          variant='solid-rounded'
          colorScheme='facebook'
          w='100%'
        >
          <TabList pb='2rem'>
            <Tab as={Link} href={`${CODES_PAGE}?tab=import`}>
              Importer des codes de la bourse
            </Tab>
            <Tab as={Link} href={`${CODES_PAGE}?tab=import-history`}>
              Historique des imports
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text as='h1' fontSize='1.5rem' fontWeight={600}>
                Import de nouveaux codes de la bourse
              </Text>
              <ImportCodeProcess />
            </TabPanel>
            <TabPanel>
              <Text as='h1' fontSize='1.5rem' fontWeight={600}>
                Historique des imports de codes de la bourse
              </Text>
              <ImportHistoryTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </VStack>
  );
}

function getCurrentSelectedTabIndex(
  searchParams: CodePageParams['searchParams'],
) {
  const selectedTab = (searchParams?.tab || IMPORT_CODE_TAB) as TabName;
  const index: TabIndex =
    tabIndexes[selectedTab] || tabIndexes[IMPORT_CODE_TAB];
  return index;
}
