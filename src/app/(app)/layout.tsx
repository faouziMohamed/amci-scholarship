import { Box, HStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Providers } from '@/app/Providers';
import AppSidebar from '@/Components/app/AppSidebar';
import { fontsVariables } from '@/styles/fonts';

export default function CodesRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='fr' className={fontsVariables.join(' ')}>
      <body>
        <Providers>
          <HStack
            position='absolute'
            inset={0}
            w='100%'
            h='100vh'
            spacing={0}
            overflow='hidden'
            alignItems='flex-start'
          >
            {/* <SimpleGrid */}
            {/*  columns={2} */}
            {/*  templateRows='1fr' */}
            {/*  templateColumns={{ base: '0.5fr auto', md: '1.1fr auto' }} */}
            {/*  position='absolute' */}
            {/*  inset={0} */}
            {/*  w='100%' */}
            {/*  h='100vh' */}
            {/*  overflow='none' */}
            {/* > */}
            <AppSidebar />
            <Box w='100%' h='100%' overflow='hidden'>
              {children}
            </Box>
            {/* </SimpleGrid> */}
          </HStack>
        </Providers>
      </body>
    </html>
  );
}
