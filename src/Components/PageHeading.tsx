import { Box, chakra, Flex, Text } from '@chakra-ui/react';

import TitleBlob from '~/logo/title-blob.svg';

import { scholarshipPeriods, ScholarshipPeriodValue } from '@/types/app.types';

const currentPeriod: ScholarshipPeriodValue = scholarshipPeriods.mars;
const CKTitleBlob = chakra(TitleBlob);
export default function PageHeading() {
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
          {currentPeriod}
          <CKTitleBlob pos='absolute' top='2rem' w='10rem' />
        </Flex>
      </Text>
    </Flex>
  );
}
