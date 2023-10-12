/* eslint-disable react/jsx-props-no-spreading */
import { Stack, StackProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function ElevatedContainer(props: { children: ReactNode } & StackProps) {
  const { children, ...others } = props;
  return (
    <Stack
      w='100%'
      rounded='2xl'
      position='relative'
      boxShadow='5px 0px 8px 1px #2222'
      px='1rem'
      py='1rem'
      {...others}
    >
      {children}
    </Stack>
  );
}
