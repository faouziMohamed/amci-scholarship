import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import '@/styles/globals.scss';

import Footer from '@/app/(landing_page)/layout/Footer';
import Header from '@/app/(landing_page)/layout/Header';
import { ChakraProviders } from '@/Components/react-contexts/ChakraProviders';
import NextAuthSessionProvider from '@/Components/react-contexts/NextAuthProvider';
import { fontsVariables } from '@/styles/fonts';

export { viewport } from '@/lib/seo.utils';
export { metadata } from '@/lib/seo.utils';
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='fr' className={fontsVariables.join(' ')}>
      <body>
        <NextAuthSessionProvider>
          <ChakraProviders>
            <SimpleGrid
              columns={1}
              templateRows='auto 1fr auto'
              position='absolute'
              inset={0}
              w='100%'
              h='100%'
            >
              <Header />
              <Box>{children}</Box>
              <Footer />
              <Flex
                bg='primary.main'
                w='100%'
                py='0.5rem'
                px='2rem'
                justifyContent='center'
                color='whiteAlpha.800'
                fontWeight={500}
              >
                <Text>
                  A.C.E.M © Copyrights 2022-{new Date().getFullYear()}
                </Text>
              </Flex>
            </SimpleGrid>
          </ChakraProviders>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
