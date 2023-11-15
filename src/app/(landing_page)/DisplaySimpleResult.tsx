'use client';

/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button } from '@chakra-ui/react';

import { capitalizeEachWord } from '@/lib/utils';

import {
  copyCodeToClipboard,
  CopyToClipboardIcon,
  getFormattedScholarshipCode,
  getScholarshipCodeTitle,
  useCopyToClipBoardToast,
} from '@/Components/componentFactory';

import { ScholarshipCode } from '@/types/app.types';

type DisplaySimpleResultProps = {
  code: ScholarshipCode;
};

export default function DisplaySimpleResult(props: DisplaySimpleResultProps) {
  const { code } = props;
  const toast = useCopyToClipBoardToast();
  return (
    <Button
      display='flex'
      flexDir='column'
      w='100%'
      rounded={0}
      alignItems='flex-start'
      justifyContent='center'
      py='3rem'
      title={getScholarshipCodeTitle(code)}
      onClick={copyCodeToClipboard(code, toast)}
      _hover={{
        '& .copyIcon': { color: 'primary.400' },
        bg: 'gray.300',
      }}
    >
      <Box
        as='span'
        fontSize='0.8rem'
        display='flex'
        gap='0.5rem'
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        // title={getRowTitle(code)}
      >
        <Box as='span' fontSize='1.1rem'>
          {getFormattedScholarshipCode(code)}
        </Box>
        <CopyToClipboardIcon className='copyIcon' color='gray.500' />
      </Box>
      <Box as='span' fontSize='0.85rem' color='primary.400'>
        {capitalizeEachWord(code.name)}
      </Box>
      <Box as='span' fontSize='0.8rem' color='gray.600'>
        {capitalizeEachWord(code.country)}
      </Box>
      <Box as='span' fontSize='0.78rem' color='gray.600'>
        {code.matricule}
      </Box>
    </Button>
  );
}
