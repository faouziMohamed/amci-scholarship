// app/layout.tsx

'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { extendedTheme } from '@/styles/theme';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <title>Bourse AMCI | Association des Comoriens Étudiant au Maroc</title>
        <meta charSet='UTF-8' />
        <meta
          name='viewport'
          content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
        />
        <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
      </head>
      <body>
        <CacheProvider>
          <ChakraProvider theme={extendedTheme}>{children}</ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
