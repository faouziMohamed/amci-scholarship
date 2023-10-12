'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { PROFILE_PAGE } from '@/lib/client-route';

export function NotAllowedToAccessModalWarning() {
  const router = useRouter();
  const onClose = useCallback(() => {
    router.push(PROFILE_PAGE);
  }, [router]);
  return (
    <Modal isCentered isOpen onClose={onClose}>
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(10deg)'
      />
      <ModalContent>
        <ModalHeader>Accés non autorisé</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Vous n&apos;avez pas le droit d&apos;accéder à cette page, seul les
          Administrateurs peuvent y accéder.
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Fermer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
