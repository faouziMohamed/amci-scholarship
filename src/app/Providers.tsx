// app/providers.tsx

'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

import { extendedTheme } from '@/styles/theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={extendedTheme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}