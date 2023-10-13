'use client';

import {
  Card,
  CardBody,
  CardProps,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

import { fShortenNumber } from '@/lib/format-number';

export default function AppWidgetSummary({
  title,
  total,
  icon,
  ...other
}: {
  title: string;
  total: number;
  icon: ReactNode;
} & CardProps) {
  return (
    <Card
      direction='row'
      alignItems='center'
      justifyContent='center'
      px='1rem'
      flexGrow={1}
      transition='box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
      boxShadow='rgba(145, 158, 171, 0.1) 0px 0px 2px 0px, rgba(145, 158, 171, 0.2) 0px 12px 24px -4px'
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {!!icon && icon}
      <CardBody>
        <Stack spacing={0.5}>
          <Heading p={0} as='h4' fontSize='1.25rem'>
            {fShortenNumber(total)}
          </Heading>
          <Text fontSize='0.875rem' color='blackAlpha.600' fontWeight={500}>
            {title}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
