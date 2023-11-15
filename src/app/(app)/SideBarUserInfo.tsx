import { Box, Stack } from '@chakra-ui/react';

export function SideBarUserInfo({
  name,
  role,
}: {
  name: string;
  role: string;
}) {
  return (
    <Stack
      rounded='md'
      px='0.6rem'
      py='0.4rem'
      spacing={0}
      bgColor='primary.semiDark'
    >
      <Box as='h1' lineHeight='1.5rem' fontSize='1.2rem' fontWeight='600'>
        {name}
      </Box>
      <Box as='span' fontSize='0.8rem' fontWeight='500' color='whiteAlpha.700'>
        {role}
      </Box>
    </Stack>
  );
}
