import {
  chakra,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { SystemStyleObject } from '@chakra-ui/styled-system';

import { adjustColor, capitalizeEachWord } from '@/lib/utils';

import {
  copyCodeToClipboard,
  CopyToClipboardIcon,
  getFormattedScholarshipCode,
  getListAriaLabel,
  getRowTitle,
  getScholarshipCodeTitle,
  useCopyToClipBoardToast,
} from '@/Components/componentFactory';
import theme from '@/styles/theme';

import { ScholarshipCode } from '@/types/app.types';

const oddRowsBg: SystemStyleObject = {
  bg: `${adjustColor(theme.colors.primary.main, 70, 20)} !important`,
  _hover: {
    bg: `${adjustColor(theme.colors.primary.main, 70, 30)} !important`,
  },
};
const evenRowsBg: SystemStyleObject = {
  bg: 'whiteAlpha.700 !important',
  _hover: {
    bg: `${adjustColor(theme.colors.secondary.main, 80, 20)} !important`,
  },
};

export default function ShowTableResult(props: {
  totalCount: number;
  codes: ScholarshipCode[];
}) {
  const toast = useCopyToClipBoardToast();
  const { codes, totalCount } = props;
  return (
    <TableContainer rounded='lg' border='1px solid' borderColor='primary.200'>
      <Table
        variant='striped'
        colorScheme='primary'
        borderBottomRadius='lg'
        rounded='md'
        size='md'
        aria-label={getListAriaLabel(totalCount)}
        title={getListAriaLabel(totalCount)}
        sx={{ '& tr:last-of-type td': { borderBottom: 'none' } }}
      >
        <Thead bg='primary.main'>
          <Tr color='whiteAlpha.700'>
            <Th color='whiteAlpha.700'>Code</Th>
            <Th color='whiteAlpha.700' isNumeric>
              Matricule
            </Th>
            <Th color='whiteAlpha.700'>Nom et prénom</Th>
            <Th color='whiteAlpha.700'>Nationalité</Th>
          </Tr>
        </Thead>
        <Tbody>
          {codes.map((code) => (
            <Tr
              sx={{
                // style even and odd rows differently
                '&:nth-of-type(even)': evenRowsBg,
                '&:nth-of-type(odd) td': { bg: 'transparent !important' },
                '&:nth-of-type(odd)': oddRowsBg,
              }}
              key={code.matricule}
              title={getRowTitle(code)}
            >
              <Td
                title={getScholarshipCodeTitle(code)}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={copyCodeToClipboard(code, toast)}
                cursor='pointer'
                display='flex'
                alignItems='center'
                justifyContent='flex-start'
                gap='0.5rem'
                _hover={{
                  '& .copyIcon': { color: 'primary.400' },
                }}
              >
                <CopyToClipboardIcon className='copyIcon' color='gray.500' />
                <chakra.span>{getFormattedScholarshipCode(code)}</chakra.span>
              </Td>
              <Td isNumeric>{code.matricule}</Td>
              <Td>{capitalizeEachWord(code.name)}</Td>
              <Td>{capitalizeEachWord(code.country)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
