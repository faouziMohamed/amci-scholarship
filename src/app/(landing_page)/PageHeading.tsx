import { Box, Flex, Text } from '@chakra-ui/react';

import { getCurrentScholarshipPeriod } from '@/lib/utils';

import { CKTitleBlob } from '@/app/(landing_page)/CKTitleBlob';

import { scholarshipPeriods } from '@/types/app.types';

export default function PageHeading() {
  const currentPeriod = getCurrentScholarshipPeriod();
  return (
    <Flex
      flexDirection='column'
      w='100%'
      alignItems='center'
      textAlign='center'
    >
      <Text fontWeight='600' fontSize='1.8rem' as='h1'>
        <Box as='span'>Code de la bourse AMCI période : </Box>
        <Flex display='inline-flex' justifyContent='center' position='relative'>
          {scholarshipPeriods[currentPeriod]}
          <CKTitleBlob pos='absolute' top='2rem' w='10rem' />
        </Flex>
      </Text>
    </Flex>
  );
}
