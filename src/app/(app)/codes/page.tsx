/* eslint-disable react/jsx-props-no-spreading */

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
  Stack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

import { AddNewCodes } from '@/Components/app/AddNewCodes';

import {
  ScholarshipCodeWithPassport,
  ScholarshipPeriod,
  scholarshipPeriods,
} from '@/types/app.types';

export default function CodesPage() {
  const [codes, setCodes] = useState<ScholarshipCodeWithPassport[]>([]);
  const [period, setPeriod] = useState<ScholarshipPeriod | undefined>();
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
        <Accordion w='100%' allowToggle allowMultiple defaultIndex={[0, 1]}>
          <AccordionItem>
            <Text as='h2'>
              <AccordionButton fontWeight={500}>
                Selection du periode de la bourse
                <AccordionIcon />
              </AccordionButton>
            </Text>
            <AccordionPanel pb={4}>
              <VStack alignItems='flex-start'>
                <Text>
                  Veuillez choisir la periode correspondante pour ces codes:
                </Text>
                <Alert maxWidth='35rem' rounded='md' status='info'>
                  <AlertIcon />
                  La periode choisie sera appliquée pour tous les codes
                  importées
                </Alert>
                <Stack flexFlow='row wrap'>
                  {Object.keys(scholarshipPeriods).map((key) => (
                    <Tag
                      as={Button}
                      key={key}
                      bgColor={
                        period === key ? 'primary.main' : 'primary.semiDark'
                      }
                      color={period === key ? 'primary.50' : '#222'}
                      _hover={{
                        bgColor: 'primary.500',
                        color: 'primary.50',
                      }}
                      onClick={() => setPeriod(key as ScholarshipPeriod)}
                    >
                      {scholarshipPeriods[key as ScholarshipPeriod]}
                    </Tag>
                  ))}
                </Stack>
              </VStack>
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
                <AddNewCodes
                  period={period}
                  codes={codes}
                  setCodes={setCodes}
                />
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </VStack>
  );
}
