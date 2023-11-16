'use client';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Skeleton,
  Stack,
  Text,
  ToastId,
  UseToastOptions,
  VStack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { Fragment, useCallback, useEffect, useState } from 'react';

import { POST_CODES_ROUTE } from '@/lib/server-route';
import { crateWebsocketConnection } from '@/lib/utils';

import { ImportProgressMessage } from '@/app/(app)/codes/ImportProgressMessage';
import { PreviewImportedCodes } from '@/app/(app)/codes/PreviewImportedCodes';
import { ReadNewScholarshipCodes } from '@/app/(app)/codes/ReadNewScholarshipCodes';
import { SelectScholarshipPeriod } from '@/app/(app)/codes/SelectScholarshipPeriod';
import { useCopyToClipBoardToast } from '@/Components/componentFactory';
import { checkCodeImportStatus } from '@/Services/codes.service';

import {
  AppUserWithToken,
  CodeImportStatus,
  ScholarshipCodeWithPassport,
  ScholarshipPeriod,
} from '@/types/app.types';

export function ImportCodeProcess() {
  const [codes, setCodes] = useState<ScholarshipCodeWithPassport[]>([]);
  const [period, setPeriod] = useState<ScholarshipPeriod | undefined>();
  const [processingPreview, setProcessingPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useCopyToClipBoardToast();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const { user } = session!;
  const [importInProgress, setImportInProgress] =
    useState<CodeImportStatus | null>(null);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const client = crateWebsocketConnection();
    client.connect({}, () => {
      client.subscribe('/topic/codes', (message) => {
        const bodyStr = message.body;
        const body = JSON.parse(bodyStr) as CodeImportStatus;
        setImportInProgress(body);
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
    void handleImportInProgress(
      user,
      setImportInProgress,
      setIsSubmitting,
      toast,
    );

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
      {isSubmitting && (
        <Stack position='absolute' top='0' left={-5} w='100%'>
          <Skeleton height='3px' w='110%' startColor='primary.main' />
        </Stack>
      )}
      {importInProgress && importInProgress.processedPercentage >= 0 && (
        <ImportProgressMessage importInProgress={importInProgress} />
      )}
      <Accordion
        w='100%'
        position='relative'
        allowMultiple
        defaultIndex={[0, 1]}
      >
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

async function handleImportInProgress(
  user: AppUserWithToken,
  setImportInProgress: (value: CodeImportStatus | null) => void,
  setIsSubmitting: (value: boolean) => void,
  toast: (opt?: UseToastOptions) => ToastId,
) {
  try {
    const body = await checkCodeImportStatus(user);
    setImportInProgress(body);
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
