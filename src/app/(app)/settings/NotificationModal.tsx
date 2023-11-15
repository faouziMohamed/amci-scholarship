import {
  Alert,
  AlertIcon,
  Button,
  Card,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { MdQueryBuilder } from 'react-icons/md';

export function NotificationModal({ opened = true }: { opened: boolean }) {
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
