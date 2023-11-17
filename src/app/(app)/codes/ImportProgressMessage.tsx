import { Alert, AlertIcon, Card, Text } from '@chakra-ui/react';

import { fPercent } from '@/lib/format-number';

import { CodeImportStatus } from '@/types/app.types';

export function ImportProgressMessage({
  importInProgress,
}: {
  importInProgress: CodeImportStatus;
}) {
  const { processedPercentage } = importInProgress;
  return (
    <Alert
      w='100%'
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
        L&apos;importation des codes est
        {processedPercentage >= 100
          ? ' terminée!'
          : ` en cours... ${fPercent(processedPercentage)}`}
        <Text as='span' display='block'>
          Vous receverez une notification lorsque l&apos;importation sera
          terminée!
        </Text>
      </Text>
    </Alert>
  );
}
