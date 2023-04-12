'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { Box, ChakraProvider, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import AppHead from '@/app/AppHead';
import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import theme, { extendedTheme } from '@/styles/theme';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='fr'>
      <AppHead />
      <body>
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }
          body {
            height: 100vh;
            position: relative;
          }
        `}</style>
        <CacheProvider>
          <ChakraProvider theme={extendedTheme}>
            <SimpleGrid
              className={theme.fonts.variables.join(' ')}
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
                  A.C.E.M © Copyrights 2021-{new Date().getFullYear()}
                </Text>
              </Flex>
            </SimpleGrid>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
