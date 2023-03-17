'use client';

/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box } from '@chakra-ui/react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useViewMode } from '@/lib/hooks';

import ShowListResult from '@/Components/ShowListResult';
import ShowTableResult from '@/Components/ShowTableResult';

import { FetchedCodes } from '@/types/app.types';

export default function DisplayResults({ codes, totalCount }: FetchedCodes) {
  const viewMode = useViewMode();
  return (
    <Box maxW={viewMode === 'grid' ? '55rem' : '33.5rem'} w='full'>
      {!!viewMode && !!totalCount && viewMode === 'grid' ? (
        <ShowTableResult totalCount={totalCount} codes={codes} />
      ) : (
        <ShowListResult codes={codes} totalCount={totalCount} />
      )}
    </Box>
  );
}
