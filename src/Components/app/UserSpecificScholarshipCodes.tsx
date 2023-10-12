import {
  Alert,
  AlertIcon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { capitalizeEachWord } from '@/lib/utils';

import {
  copyCodeToClipboard,
  CopyToClipboardIcon,
  getFormattedScholarshipCode,
  getListAriaLabel,
  getRowTitle,
  getScholarshipCodeTitle,
  useCopyToClipBoardToast,
} from '@/Components/componentFactory';
import { evenRowsBg, oddRowsBg } from '@/Components/TableStyles';
import {
  defaultPaginatedScholarshipCode,
  getCodesByMatricule,
} from '@/Services/codes.service';

import {
  AppUserWithToken,
  PaginatedScholarshipCode,
  ScholarshipPeriod,
  scholarshipPeriods,
} from '@/types/app.types';

function getScholarshipPeriod(period: ScholarshipPeriod) {
  const p = period.toLowerCase() as ScholarshipPeriod;
  return scholarshipPeriods[p];
}

export function UserSpecificScholarshipCodes({
  user,
}: {
  user: AppUserWithToken;
}) {
  const [codes, setCodes] = useState<PaginatedScholarshipCode>(
    defaultPaginatedScholarshipCode,
  );
  const [fetching, setFetching] = useState(true);
  const toast = useCopyToClipBoardToast();

  useEffect(() => {
    setFetching(true);
    void getCodesByMatricule(user.matricule, 0, 5)
      .then((fetchedCodes) => {
        setCodes(fetchedCodes);
        return fetchedCodes;
      })
      .catch(() => {
        toast({
          title: 'Erreur de chargement',
          description: 'Impossible de charger les codes',
          status: 'error',
        });
      })
      .finally(() => setFetching(false));
  }, [toast, user.matricule]);
  return (
    <TableContainer
      rounded='lg'
      border='1px solid'
      borderColor='primary.200'
      w='100%'
    >
      <Table
        variant='striped'
        colorScheme='primary'
        borderBottomRadius='lg'
        rounded='md'
        size='md'
        aria-label={getListAriaLabel(codes.codes.length)}
        title={getListAriaLabel(codes.codes.length)}
        sx={{ '& tr:last-of-type td': { borderBottom: 'none' } }}
      >
        <Thead bg='primary.main'>
          <Tr color='whiteAlpha.700'>
            <Th color='whiteAlpha.700'>Code</Th>
            <Th color='whiteAlpha.700'>Periode</Th>
            <Th color='whiteAlpha.700'>Matricule AMCI</Th>
            <Th color='whiteAlpha.700'>Nom et prénom</Th>
          </Tr>
        </Thead>

        <Tbody>
          {fetching && (
            <Tr>
              <Td colSpan={4}>
                <Alert
                  status='loading'
                  textAlign='center'
                  bgColor='transparent'
                >
                  <AlertIcon />
                  Chargement des données...
                </Alert>
              </Td>
            </Tr>
          )}
          {codes?.codes.map((code) => (
            <Tr
              sx={{
                // style even and odd rows differently
                '&:nth-of-type(even)': evenRowsBg,
                '&:nth-of-type(odd) td': {
                  bg: 'transparent !important',
                },
                '&:nth-of-type(odd)': oddRowsBg,
              }}
              key={code.id}
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
                <Text as='span'>{getFormattedScholarshipCode(code)}</Text>
              </Td>
              <Td>{getScholarshipPeriod(code.period)}</Td>
              <Td>{code.matricule}</Td>
              <Td>{capitalizeEachWord(code.name)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
