import {
  Alert,
  AlertIcon,
  Badge,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { fShortenNumber } from '@/lib/format-number';
import { formattedDate } from '@/lib/utils';

import { evenRowsBg, oddRowsBg } from '@/Components/TableStyles';

import { ImportHistory } from '@/types/app.types';

export function ImportHistoryTable(props: {
  isLoadingImportHistory: boolean;
  importHistory: ImportHistory[];
}) {
  const { isLoadingImportHistory, importHistory } = props;
  return (
    <TableContainer
      rounded='lg'
      border='1px solid'
      borderColor='blackAlpha.100'
      flexBasis={{ xlg: '60%' }}
    >
      <Text as='h2' fontSize='1.2rem' fontWeight={600} p='1rem'>
        Historique des imports
      </Text>
      <Table
        variant='striped'
        colorScheme='blackAlpha'
        borderBottomRadius='lg'
        rounded='md'
        size='md'
        sx={{ '& tr:last-of-type td': { borderBottom: 'none' } }}
      >
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Importateur</Th>
            <Th>Status</Th>
            <Th>Nombre d&apos;ajouts</Th>
            <Th>Date d&apos;import</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoadingImportHistory && (
            <Tr>
              <Td colSpan={5}>
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
          {importHistory.length === 0 && !isLoadingImportHistory && (
            <Tr>
              <Td colSpan={5} textAlign='center'>
                <Alert status='info' textAlign='center' bgColor='transparent'>
                  <AlertIcon />
                  Aucune donnée à afficher
                </Alert>
              </Td>
            </Tr>
          )}
          {importHistory.map((historyItem) => (
            <Tr
              sx={{
                // style even and odd rows differently
                '&:nth-of-type(even)': evenRowsBg,
                '&:nth-of-type(odd) td': { bg: 'transparent !important' },
                '&:nth-of-type(odd)': oddRowsBg,
              }}
              key={historyItem.id}
            >
              <Td>{historyItem.id}</Td>
              <Td>{historyItem.importedBy.name}</Td>
              <Td>
                {historyItem.status === 'SUCCESS' ? (
                  <Badge colorScheme='green'>Succès</Badge>
                ) : (
                  <Badge colorScheme='red'>Echec</Badge>
                )}
              </Td>
              <Td>{fShortenNumber(historyItem.nbAdded)}</Td>
              <Td>{formattedDate(historyItem.importDate)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
