import { Stack } from '@chakra-ui/react';

import PageHeading from '@/app/(landing_page)/PageHeading';
import SearchCodes from '@/app/(landing_page)/SearchCodes';
import { UserInstruction } from '@/app/(landing_page)/UserInstruction';

export default function HomePage() {
  return (
    <Stack spacing='2rem' as='main' px='1.5rem' py='3rem'>
      <PageHeading />
      <Stack alignItems='center' gap='1rem' as='section' pt='5rem'>
        <UserInstruction />
        <SearchCodes />
      </Stack>
    </Stack>
  );
}
