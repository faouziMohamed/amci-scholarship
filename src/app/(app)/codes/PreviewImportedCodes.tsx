import {
  Alert,
  AlertIcon,
  Button,
  chakra,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { MdCloudUpload } from 'react-icons/md';

import { capitalizeEachWord, formatNumber } from '@/lib/utils';

import {
  copyCodeToClipboard,
  CopyToClipboardIcon,
  getListAriaLabel,
  getRowTitle,
  getScholarshipCodeTitle,
  useCopyToClipBoardToast,
} from '@/Components/componentFactory';
import { evenRowsBg, oddRowsBg } from '@/Components/TableStyles';

import {
  ScholarshipCodeWithPassport,
  scholarshipPeriods,
} from '@/types/app.types';

const DEFAULT_ROW_COUNT_PREVIEW = 100;
export const PICK = Number(
  process.env.NEXT_PUBLIC_ROW_COUNT_PREVIEW || DEFAULT_ROW_COUNT_PREVIEW,
);
let randomPick: ScholarshipCodeWithPassport[] = [];

export function PreviewImportedCodes({
  codes,
  isProcessing,
  isSubmitting,
  onSubmit,
}: {
  codes: ScholarshipCodeWithPassport[];
  isProcessing: boolean;
  isSubmitting: boolean;
  onSubmit: () => Promise<void>;
}) {
  randomPick = useMemo(() => {
    return codes.sort(() => Math.random() - 0.5).slice(0, PICK);
  }, [codes]);
  const toast = useCopyToClipBoardToast();
  return (
    <Stack spacing={2} w='100%' pt={5} position='relative'>
      <Stack w='100%' alignItems='center' flexGrow={1} spacing={2}>
        {codes.length > 0 && (
          <Alert status='success' w='100%' rounded='md'>
            <AlertIcon />
            Voici {PICK} lignes selectionnées aléatoirement
          </Alert>
        )}
        <Button
          alignSelf='flex-start'
          bgColor='primary.main'
          color='primary.50'
          _hover={{ bgColor: 'primary.400' }}
          _active={{ bgColor: 'primary.400' }}
          leftIcon={<MdCloudUpload />}
          isLoading={isSubmitting || isProcessing}
          loadingText='Enregistrement...'
          isDisabled={codes.length === 0 || isSubmitting || isProcessing}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={onSubmit}
        >
          Enregistrer
        </Button>
      </Stack>

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
          aria-label={getListAriaLabel(codes.length)}
          title={getListAriaLabel(codes.length)}
          sx={{ '& tr:last-of-type td': { borderBottom: 'none' } }}
        >
          <Thead bg='primary.main'>
            <Tr color='whiteAlpha.700'>
              <Th color='whiteAlpha.700'>Code partie 1</Th>
              <Th color='whiteAlpha.700'>Code partie 2</Th>
              <Th color='whiteAlpha.700'>Periode</Th>

              <Th color='whiteAlpha.700'>Matricule AMCI</Th>
              <Th color='whiteAlpha.700'>Nom et prénom</Th>
              <Th color='whiteAlpha.700'>Nationalité</Th>
              <Th color='whiteAlpha.700'>Numéro de passeport</Th>
            </Tr>
          </Thead>

          <Tbody>
            {codes.length === 0 && !isProcessing && (
              <Tr>
                <Td colSpan={7} textAlign='center'>
                  <Alert status='info' textAlign='center' bgColor='transparent'>
                    <AlertIcon />
                    Aucune donnée à afficher
                  </Alert>
                </Td>
              </Tr>
            )}
            {isProcessing && (
              <Tr>
                <Td colSpan={7}>
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
            {/* show only first 50t rows */}
            {randomPick.map((code) => (
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
                <Td title={getScholarshipCodeTitle(code)}>{code.periodCode}</Td>
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
                  <chakra.span>
                    {formatNumber(code.scholarshipCode, ' ')}
                  </chakra.span>
                </Td>
                <Td>{scholarshipPeriods[code.period]}</Td>
                <Td>{code.matricule}</Td>
                <Td>{capitalizeEachWord(code.name)}</Td>
                <Td>{capitalizeEachWord(code.country)}</Td>
                <Td>{code.numPassport.toUpperCase()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
