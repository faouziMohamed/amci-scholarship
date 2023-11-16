'use client';

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
  VStack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { capitalize, capitalizeEachWord, genSequences } from '@/lib/utils';

import { useCopyToClipBoardToast } from '@/Components/componentFactory';
import { evenRowsBg, oddRowsBg } from '@/Components/TableStyles';
import { getUsers } from '@/Services/user.service';

import { AppUser, userRoleValue } from '@/types/app.types';

export default function UserPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const { data: session } = useSession();
  const { user } = session!;
  const toast = useCopyToClipBoardToast();
  const genId = genSequences(1);

  useEffect(() => {
    setIsLoadingUsers(true);
    void getUsers(user.token, 0, 500)
      .then((fetchedUsers) => {
        setUsers(fetchedUsers);
        return fetchedUsers;
      })
      .catch((error) => {
        const msg = (error as Error).message;
        toast({
          title: 'Erreur de chargement de la liste des utilisateurs',
          description: msg,
          status: 'error',
        });
      })
      .finally(() => setIsLoadingUsers(false));
  }, [toast, user.token]);
  return (
    <VStack w='100%' alignItems='center' h='100%' py='2rem' overflow='auto'>
      <VStack
        textAlign='start'
        width='100%'
        maxW='90rem'
        mx='auto'
        alignItems='flex-start'
        px='1rem'
        spacing={10}
      >
        <Text as='h1' fontSize='1.5rem' fontWeight={500}>
          Utilisateurs
        </Text>
        <Alert
          rounded='md'
          maxW='30rem'
          status='info'
          alignItems='flex-start'
          colorScheme='purple'
        >
          <AlertIcon />
          <Text>
            Prochainement, vous pourrez{' '}
            <Text as='span' color='primary.main' fontWeight={500}>
              activer
            </Text>{' '}
            ou{' '}
            <Text as='span' color='primary.main' fontWeight={500}>
              désactiver
            </Text>{' '}
            les comptes des utilisateurs et leur{' '}
            <Text as='span' color='primary.main' fontWeight={500}>
              attribuer des rôles
            </Text>
            , etc.
          </Text>
        </Alert>
        <TableContainer
          rounded='lg'
          border='1px solid'
          borderColor='blackAlpha.100'
          flexBasis={{ xlg: '60%' }}
        >
          <Text as='h2' fontSize='1.2rem' fontWeight={600} p='1rem'>
            Liste des utilisateurs
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
                <Th>Matricule</Th>
                <Th>Nom et Prénom</Th>
                <Th>Rôle</Th>
                <Th>Email</Th>
                <Th>Email vérifié</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoadingUsers && (
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
              {users.length === 0 && !isLoadingUsers && (
                <Tr>
                  <Td colSpan={5} textAlign='center'>
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
              {users.map((u) => (
                <Tr
                  sx={{
                    // style even and odd rows differently
                    '&:nth-of-type(even)': evenRowsBg,
                    '&:nth-of-type(odd) td': { bg: 'transparent !important' },
                    '&:nth-of-type(odd)': oddRowsBg,
                  }}
                  key={u.id}
                >
                  <Td>{genId()}</Td>
                  <Td>{capitalize(u.matricule)}</Td>
                  <Td>{capitalizeEachWord(u.name)}</Td>
                  <Td>{userRoleValue[u.role]}</Td>
                  <Td>{u.email}</Td>
                  <Td>
                    {u.isEmailVerified ? (
                      <Badge colorScheme='green'>Vérifié</Badge>
                    ) : (
                      <Badge colorScheme='red'>Non vérifié</Badge>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </VStack>
  );
}
