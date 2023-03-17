'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import {
  Box,
  chakra,
  ChakraProvider,
  Flex,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import theme, { extendedTheme } from '@/styles/theme';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <chakra.html lang='fr' scrollBehavior='smooth'>
      <chakra.body
        h='100vh'
        className={theme.fonts.variables.join(' ')}
        position='relative'
      >
        <CacheProvider>
          <ChakraProvider theme={extendedTheme}>
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
                  A.C.E.M © Copyrights 2021-{new Date().getFullYear()}
                </Text>
              </Flex>
            </SimpleGrid>
          </ChakraProvider>
        </CacheProvider>
      </chakra.body>
    </chakra.html>
  );
}
