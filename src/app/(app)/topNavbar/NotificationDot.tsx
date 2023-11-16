import { Box } from '@chakra-ui/react';

export function NotificationDot() {
  return (
    <Box
      id='notification-dot'
      as='span'
      rounded='full'
      w={2}
      h={2}
      bg='primary.light'
      position='absolute'
      top='0.3rem'
      right='0.4rem'
    />
  );
}
