import { Alert, AlertIcon, Code, Stack, Text, VStack } from '@chakra-ui/react';

import { csvFormat } from '@/lib/utils';

import { DragAndDropZone } from '@/Components/app/DragAndDropZone';
import { useCsvFileReading } from '@/Components/app/UseCsvFileReading';

import {
  ScholarshipCodeWithPassport,
  ScholarshipPeriod,
} from '@/types/app.types';

type AddNewCodesProps = {
  period: ScholarshipPeriod;
  setCodes: (codes: ScholarshipCodeWithPassport[]) => void;
  setProcessingPreview: (value: boolean) => void;
};

export function ReadNewScholarshipCodes({
  period,
  setCodes,
  setProcessingPreview,
}: AddNewCodesProps) {
  const fileReading = useCsvFileReading(setCodes, period, setProcessingPreview);

  const { getRootProps } = fileReading;
  const { getInputProps, isDragActive } = fileReading;
  return (
    <Stack w='100%' textAlign='center' spacing={10}>
      <Alert
        addRole
        colorScheme='purple'
        status='warning'
        rounded='md'
        alignItems='flex-start'
      >
        <AlertIcon />
        <VStack spacing={5} alignItems='flex-start'>
          <Text textAlign='start'>
            Assurez-vous que le fichier csv contient les colonnes suivantes et
            dans cet ordre et sans l&apos;entête (header):
          </Text>
          <Code px='0.5rem' py='0.4rem' rounded='md' textAlign='start'>
            {csvFormat.join(', ')}
          </Code>
        </VStack>
      </Alert>
      <DragAndDropZone
        rootProps={getRootProps()}
        inputProps={getInputProps()}
        isDragActive={isDragActive}
      />
    </Stack>
  );
}
