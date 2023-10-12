'use client';

import { Box } from '@chakra-ui/react';
import { memo } from 'react';

import { useViewMode } from '@/lib/hooks';

import ShowListResult from '@/Components/ShowListResult';
import ShowTableResult from '@/Components/ShowTableResult';

import { FetchedCodes } from '@/types/app.types';

export default function DisplayResults({ codes, totalCount }: FetchedCodes) {
  const viewMode = useViewMode();

  const Results = memo(
    () => (
      <Box maxW={viewMode === 'grid' ? '55rem' : '33.5rem'} w='full'>
        {!!viewMode && !!totalCount && viewMode === 'grid' ? (
          <ShowTableResult totalCount={totalCount} codes={codes} />
        ) : (
          <ShowListResult codes={codes} totalCount={totalCount} />
        )}
      </Box>
    ),

    () => true,
  );
  Results.displayName = 'Results';
  return <Results />;
}
