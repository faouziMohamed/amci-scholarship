'use client';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
  ToastId,
  UseToastOptions,
  VStack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { Fragment, useCallback, useEffect, useState } from 'react';

import { crateWebsocketConnection } from '@/lib/utils';

import { createOnSubmitHandler } from '@/app/(app)/codes/createOnSubmitHandler';
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

export function ImportCodeProcess({ tabIndex }: { tabIndex: number }) {
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

    // eslint-disable-next-line consistent-return
    return () => {
      if (!client?.connected || !mounted) return;
      // eslint-disable-next-line no-console
      client.disconnect(() => console.log('disconnected'));
    };
  }, [mounted, toast, user, user.token]);

  useEffect(() => {
    if (!mounted) return;
    void handleImportInProgress(
      user,
      setImportInProgress,
      setIsSubmitting,
      toast,
    );
  }, [tabIndex, toast, user, mounted]);

  const onSubmit = useCallback(
    () =>
      createOnSubmitHandler(
        setIsSubmitting,
        codes,
        toast,
        user,
        period,
        setCodes,
      ),
    [codes, period, toast, user],
  );

  return (
    <>
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
                  onSubmit={onSubmit()}
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
