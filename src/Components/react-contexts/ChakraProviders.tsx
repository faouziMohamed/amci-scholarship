'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { extendedTheme } from '@/styles/theme';

export function ChakraProviders({ children }: { children: ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={extendedTheme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
