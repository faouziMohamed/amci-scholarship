import {
  Alert,
  AlertIcon,
  Button,
  Stack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';

import { ScholarshipPeriod, scholarshipPeriods } from '@/types/app.types';

export function SelectScholarshipPeriod({
  period,
  setPeriod,
}: {
  period: ScholarshipPeriod | undefined;
  setPeriod: (p: ScholarshipPeriod) => void;
}) {
  return (
    <VStack alignItems='flex-start'>
      <Text>Veuillez choisir la periode correspondante pour ces codes:</Text>
      <Alert maxWidth='35rem' rounded='md' status='info'>
        <AlertIcon />
        La periode choisie sera appliquée pour tous les codes importées
      </Alert>
      <Stack flexFlow='row wrap'>
        {Object.keys(scholarshipPeriods).map((key) => (
          <Tag
            as={Button}
            key={key}
            bgColor={period === key ? 'primary.main' : 'primary.semiDark'}
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
  );
}
