import { Box, chakra, Flex, Heading } from '@chakra-ui/react';

import TitleBlob from '~/logo/title-blob.svg';

const CKTitleBlob = chakra(TitleBlob, {
  shouldForwardProp(prop: string): boolean {
    return ['className', 'style'].includes(prop);
  },
});
export default function PageHeading() {
  return (
    <Flex direction='column' w='100%' alignItems='center' textAlign='center'>
      <Heading fontSize='1.8rem' as='h1'>
        <Box as='span'>Code de la bourse AMCI période : </Box>
        <Flex display='inline-flex' justifyContent='center' position='relative'>
          Avril/Mai
          <CKTitleBlob pos='absolute' top='2rem' w='10rem' bg='rded.100' />
        </Flex>
      </Heading>
    </Flex>
  );
}
