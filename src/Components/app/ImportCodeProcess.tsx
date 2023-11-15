'use client';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  Skeleton,
  Stack,
  Text,
  ToastId,
  UseToastOptions,
  VStack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { MdQueryBuilder } from 'react-icons/md';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { POST_CODES_ROUTE, WEB_SOCKET_URL } from '@/lib/server-route';
import { log } from '@/lib/utils';

import { PreviewImportedCodes } from '@/Components/app/PreviewImportedCodes';
import { ReadNewScholarshipCodes } from '@/Components/app/ReadNewScholarshipCodes';
import { SelectScholarshipPeriod } from '@/Components/app/SelectScholarshipPeriod';
import { useCopyToClipBoardToast } from '@/Components/componentFactory';
import { checkCodeImportStatus } from '@/Services/codes.service';

import {
  AppUserWithToken,
  CodeImportStatus,
  ScholarshipCodeWithPassport,
  ScholarshipPeriod,
} from '@/types/app.types';

function crateWebsocketConnection() {
  const socket = new SockJS(WEB_SOCKET_URL);
  return Stomp.over(socket);
}

export function ImportCodeProcess() {
  const [codes, setCodes] = useState<ScholarshipCodeWithPassport[]>([]);
  const [period, setPeriod] = useState<ScholarshipPeriod | undefined>();
  const [processingPreview, setProcessingPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useCopyToClipBoardToast();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const { user } = session!;
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const client = crateWebsocketConnection();
    client.connect({}, () => {
      client.subscribe('/topic/codes', (message) => {
        log({ message });
        const bodyStr = message.body;
        const body = JSON.parse(bodyStr) as CodeImportStatus;
        if (
          ['SAVING', 'STARTED', 'IN_PROGRESS', 'PROCESSING'].includes(
            body.status,
          )
        ) {
          setIsSubmitting(true);
          return;
        }
        setIsSubmitting(false);
      });
    });
    void handleImportInProgress(user, setIsSubmitting, toast);

    // eslint-disable-next-line consistent-return
    return () => {
      if (!client?.connected || !mounted) return;
      // eslint-disable-next-line no-console
      client.disconnect(() => console.log('disconnected'));
    };
  }, [mounted, toast, user, user.token]);

  const onSubmit = useCallback(async () => {
    setIsSubmitting(true);
    if (codes.length === 0) {
      toast({
        title: 'Aucun code à importer',
        status: 'error',
        description: 'Veuillez importer des codes avant de continuer',
      });
      return;
    }
    try {
      const response = await fetch(POST_CODES_ROUTE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ codes, period }),
      });

      if (response.status === 200) {
        toast({
          title: 'Codes importés',
          status: 'success',
          description:
            'Les codes ont été importés avec succès, ils sont disponibles dans la liste des codes',
        });
        setCodes([]);
        setIsSubmitting(false);
        return;
      }
      if (response.status === 202) {
        toast({
          title: 'Importation en cours...',
          status: 'info',
          description:
            "Les codes sont en cours d'importation, vous receverez une notification lorsque l'importation sera terminée",
        });
        setCodes([]);
        return;
      }
      const resJson = (await response.json()) as {
        message: string;
        code: number;
      };
      toast({
        title: "Erreur d'importation",
        status: 'error',
        description: resJson.message || 'Une erreur est survenue',
      });
      setIsSubmitting(false);
    } catch (error) {
      const message = (error as Error).message || 'Une erreur est survenue';
      toast({ title: 'Erreur', status: 'error', description: message });
      setIsSubmitting(false);
    }
  }, [codes, period, toast, user.token]);

  return (
    <>
      {isSubmitting && <NotificationModal opened={isSubmitting} />}
      <Stack position='absolute' top='0' left={-5} w='100%'>
        <Skeleton height='3px' w='110%' startColor='primary.main' />
      </Stack>
      <Accordion w='100%' allowMultiple defaultIndex={[0, 1]}>
        <AccordionItem>
          <Text as='h2'>
            <AccordionButton fontWeight={500}>
              Selection du période de la bourse
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel pb={4}>
            <SelectScholarshipPeriod
              isSubmitting={isSubmitting}
              period={period}
              setPeriod={setPeriod}
            />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem borderBottom='none' isDisabled={!period}>
          <Text as='h2'>
            <AccordionButton fontWeight={500}>
              Import des codes
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel pb={4} w='100%'>
            {!!period && (
              <VStack alignItems='flex-end' w='100%' spacing={5}>
                <ReadNewScholarshipCodes
                  period={period}
                  setCodes={setCodes}
                  setProcessingPreview={setProcessingPreview}
                  isSubmitting={isSubmitting}
                />
                <PreviewImportedCodes
                  codes={codes}
                  isProcessing={processingPreview}
                  isSubmitting={isSubmitting}
                  onSubmit={onSubmit}
                />
              </VStack>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
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
          <Text as='span'>Code en cours d&apos;importation</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as={Stack} gap='1rem'>
          <Text>
            Veuillez patienter pendant que nous importons les codes. Vous pouvez
            fermer cette page et continuer à utiliser l&apos;application.
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
              Vous receverez une notification lorsque l&apos;importation sera
              terminée!
            </Text>
          </Alert>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>D&apos;accord</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

async function handleImportInProgress(
  user: AppUserWithToken,
  setIsSubmitting: (value: boolean) => void,
  toast: (opt?: UseToastOptions) => ToastId,
) {
  try {
    const body = await checkCodeImportStatus(user);
    if (body.status !== 'IN_PROGRESS') {
      return;
    }
    setIsSubmitting(true);
    toast({
      title: 'Importation en cours...',
      status: 'info',
      description:
        "Une importation est en cours, vous receverez une notification lorsque l'importation sera terminée",
    });
  } catch (error) {
    const message = (error as Error).message || 'Une erreur est survenue';
    toast({ title: 'Erreur', status: 'error', description: message });
    setIsSubmitting(false);
  }
}
