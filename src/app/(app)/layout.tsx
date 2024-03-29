import { Box, HStack, VStack } from '@chakra-ui/react';
import { Metadata } from 'next';
import { ReactNode } from 'react';

import { metadata as defaultMetadata } from '@/lib/seo.utils';

import AppSidebar from '@/app/(app)/AppSidebar';
import { AppTopNavBar } from '@/app/(app)/AppTopNavBar';
import { ChakraProviders } from '@/Components/react-contexts/ChakraProviders';
import NextAuthSessionProvider, {
  AppSessionWrapper,
} from '@/Components/react-contexts/NextAuthProvider';
import { SidebarContextProvider } from '@/Components/react-contexts/SidebarContextProvider';
import { fontsVariables } from '@/styles/fonts';

export { viewport } from '@/lib/seo.utils';
export const metadata: Metadata = {
  ...defaultMetadata,
};

export default function CodesRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='fr' className={fontsVariables.join(' ')}>
      <body>
        <NextAuthSessionProvider>
          <AppSessionWrapper>
            <ChakraProviders>
              <SidebarContextProvider>
                <HStack
                  position='absolute'
                  inset={0}
                  w='100%'
                  h='100vh'
                  spacing={0}
                  overflow='hidden'
                  alignItems='flex-start'
                >
                  <AppSidebar />
                  <VStack
                    w='100%'
                    h='100%'
                    overflow='hidden'
                    position='relative'
                  >
                    <AppTopNavBar />
                    <Box w='100%' overflow='hidden'>
                      {children}
                    </Box>
                  </VStack>
                </HStack>
              </SidebarContextProvider>
            </ChakraProviders>
          </AppSessionWrapper>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
