/* eslint-disable react/jsx-props-no-spreading */

'use client';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';

import { POST_CODES_ROUTE } from '@/lib/server-route';

import { PreviewImportedCodes } from '@/Components/app/PreviewImportedCodes';
import { ReadNewScholarshipCodes } from '@/Components/app/ReadNewScholarshipCodes';
import { SelectScholarshipPeriod } from '@/Components/app/SelectScholarshipPeriod';
import { useCopyToClipBoardToast } from '@/Components/componentFactory';

import {
  ScholarshipCodeWithPassport,
  ScholarshipPeriod,
} from '@/types/app.types';

export default function CodesPage() {
  const [codes, setCodes] = useState<ScholarshipCodeWithPassport[]>([]);
  const [period, setPeriod] = useState<ScholarshipPeriod | undefined>();
  const [processingPreview, setProcessingPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useCopyToClipBoardToast();
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codes, period }),
      });

      if (response.ok) {
        toast({
          title: 'Codes importés',
          status: 'success',
          description:
            'Les codes ont été importés avec succès, ils sont disponibles dans la liste des codes',
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
    } catch (error) {
      const message = (error as Error).message || 'Une erreur est survenue';
      toast({ title: 'Erreur', status: 'error', description: message });
    } finally {
      setIsSubmitting(false);
    }
  }, [codes, period, toast]);
  return (
    <VStack h='100%' py='2rem' overflow='auto'>
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
          Import de nouveaux codes de la bourse
        </Text>
        <Accordion w='100%' allowMultiple defaultIndex={[0, 1]}>
          <AccordionItem>
            <Text as='h2'>
              <AccordionButton fontWeight={500}>
                Selection du periode de la bourse
                <AccordionIcon />
              </AccordionButton>
            </Text>
            <AccordionPanel pb={4}>
              <SelectScholarshipPeriod period={period} setPeriod={setPeriod} />
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
      </VStack>
    </VStack>
  );
}
