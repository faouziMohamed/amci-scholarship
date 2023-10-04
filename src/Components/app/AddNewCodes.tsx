import {
  Alert,
  AlertIcon,
  chakra,
  Code,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';

import { capitalizeEachWord, csvFormat, formatNumber } from '@/lib/utils';

import { DragAndDropZone } from '@/Components/app/DragAndDropZone';
import { useCsvFileReading } from '@/Components/app/UseCsvFileReading';
import {
  copyCodeToClipboard,
  CopyToClipboardIcon,
  getListAriaLabel,
  getRowTitle,
  getScholarshipCodeTitle,
} from '@/Components/componentFactory';
import { evenRowsBg, oddRowsBg } from '@/Components/TableStyles';

import {
  ScholarshipCodeWithPassport,
  ScholarshipPeriod,
} from '@/types/app.types';

const PICK = 100;

type AddNewCodesProps = {
  period: ScholarshipPeriod;
  codes: ScholarshipCodeWithPassport[];
  setCodes: (codes: ScholarshipCodeWithPassport[]) => void;
};

export function AddNewCodes({ period, codes, setCodes }: AddNewCodesProps) {
  const fileReading = useCsvFileReading(setCodes, period);

  const { toast, processing, getRootProps } = fileReading;
  const { getInputProps, isDragActive } = fileReading;
  return (
    <Stack w='100%' textAlign='center' spacing={10}>
      <Alert
        addRole
        colorScheme='purple'
        status='info'
        rounded='md'
        alignItems='flex-start'
      >
        <AlertIcon />
        <VStack spacing={5} alignItems='flex-start'>
          <Text textAlign='start'>
            Assurez-vous que le fichier csv contient les colonnes suivantes et
            dans cet ordre et sans l&apos;entête (header):
          </Text>
          <Code px='0.5rem' py='0.4rem' rounded='md' textAlign='start'>
            {csvFormat.join(', ')}
          </Code>
        </VStack>
      </Alert>
      <DragAndDropZone
        rootProps={getRootProps()}
        inputProps={getInputProps()}
        isDragActive={isDragActive}
      />
      <Stack w='100%' alignItems='center' spacing={5}>
        {codes.length > 0 && (
          <Alert status='success' w='100%' rounded='md'>
            <AlertIcon />
            Les {PICK} premiers lignes sont affichés
          </Alert>
        )}

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
              {codes.length === 0 && !processing && (
                <Tr>
                  <Td colSpan={7} textAlign='center'>
                    <Alert
                      status='info'
                      textAlign='center'
                      bgColor='transparent'
                    >
                      <AlertIcon />
                      Aucune donnée à afficher
                    </Alert>
                  </Td>
                </Tr>
              )}
              {processing && (
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
              {codes.slice(0, PICK).map((code) => (
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
                  <Td title={getScholarshipCodeTitle(code)}>
                    {code.amciCountryCode}
                  </Td>
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
                    <CopyToClipboardIcon
                      className='copyIcon'
                      color='gray.500'
                    />
                    <chakra.span>
                      {formatNumber(code.scholarshipCode, ' ')}
                    </chakra.span>
                  </Td>
                  <Td>{code.period}</Td>
                  <Td>{code.matricule}</Td>
                  <Td>{capitalizeEachWord(code.name)}</Td>
                  <Td>{capitalizeEachWord(code.country)}</Td>
                  <Td>{capitalizeEachWord(code.numPassport)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
}
