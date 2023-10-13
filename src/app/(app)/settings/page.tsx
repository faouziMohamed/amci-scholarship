'use client';

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Portal,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { MdQueryBuilder } from 'react-icons/md';

import { ElevatedContainer } from '@/Components/ElevatedContainer';

export default function SettingsPage() {
  return (
    <VStack h='100%' w='100%' py='2rem' overflowY='auto' spacing='1rem'>
      <VStack
        textAlign='start'
        width='100%'
        maxW='90rem'
        mx='auto'
        alignItems='flex-start'
        px='1rem'
        spacing={10}
      >
        <Text as='h1' fontSize='1.5rem' fontWeight={600}>
          Mon compte
        </Text>
        <Stack
          w='100%'
          gap='1rem'
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Box
            flexBasis={{ md: '60%' }}
            padding='6'
            boxShadow='lg'
            bg='white'
            w='100%'
          >
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </Box>
          <ElevatedContainer gap='1rem' flexGrow={0} flexBasis='40%'>
            <Skeleton height='90px' />
            <Skeleton height='20px' />
            <Flex w='100%' gap='0.5rem'>
              <Skeleton w='3rem' height='10px' />
              <Skeleton height='10px' />
            </Flex>
          </ElevatedContainer>
        </Stack>
        <Stack w='100%'>
          <Skeleton w='100px' height='10px' rounded='sm' />
          <Skeleton height='40px' rounded='md' />

          <Skeleton mt='0.5rem' w='100px' height='10px' rounded='sm' />
          <Skeleton height='40px' rounded='md' />
        </Stack>
        <Portal>
          <NotificationModal opened />
        </Portal>
      </VStack>
    </VStack>
  );
}

function NotificationModal({ opened = true }: { opened: boolean }) {
  const [open, setOpen] = useState(opened);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <Modal isCentered isOpen={open} onClose={onClose}>
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(10deg)'
      />
      <ModalContent>
        <ModalHeader
          gap='0.3rem'
          display='flex'
          flexDirection='row'
          alignItems='center'
        >
          <Icon as={MdQueryBuilder} fontSize='1.3rem' />
          <Text as='span'>Page en cours de construction</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as={Stack} gap='1rem'>
          <Text>
            Ici vous pouvez modifier/ajouter plusieurs informations qui pourront
            aider votre section de l&apos;ACEM.
          </Text>
          <Alert
            as={Card}
            alignItems='flex-start'
            flexDirection='row'
            rounded='md'
            status='error'
            colorScheme='twitter'
            bgColor='transparent'
          >
            <AlertIcon />
            <Text>
              Lorsque cette page sera disponible et opérationelle, nous vous
              notifierons par mail!
            </Text>
          </Alert>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Fermer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
