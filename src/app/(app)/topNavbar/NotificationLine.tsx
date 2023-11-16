import { Box, Icon, MenuItem, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { BiSolidError } from 'react-icons/bi';
import { IoInformationCircleSharp } from 'react-icons/io5';

import { CODES_PAGE } from '@/lib/client-route';
import { getSeverityColor } from '@/lib/utils';
import { IMPORT_HISTORY_TAB } from '@/lib/utils.constant';

import { AppNotification } from '@/types/app.types';

type Props = {
  notification: AppNotification;
};

export function NotificationLine({ notification }: Props) {
  const {
    description,
    title,
    isRead = false,
    severity,

    action,
  } = notification;
  const iconColor = getSeverityColor(severity);
  const clickable = action === 'CODE_IMPORT';
  return (
    <MenuItem
      as={clickable ? Link : Box}
      alignItems='flex-start'
      bgColor={isRead ? 'initial' : 'primary.50'}
      onClick={() => {}}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(clickable
        ? {
            href: `${CODES_PAGE}?tab=${IMPORT_HISTORY_TAB}`,
          }
        : {})}
      sx={{
        '&:hover .notification-title': {
          textDecoration: clickable ? 'underline' : 'none',
        },
      }}
    >
      <Icon
        as={
          severity === 'SUCCESS' || severity === 'INFO'
            ? IoInformationCircleSharp
            : BiSolidError
        }
        mr='0.5rem'
        color={iconColor}
      />
      <Stack gap='0.2rem'>
        <Text
          as='h3'
          className='notification-title'
          fontSize='0.8rem'
          fontWeight='500'
        >
          {title}
        </Text>
        <Text fontSize='0.8rem' color='blackAlpha.800' fontWeight='400'>
          {description}
        </Text>
        <Text fontSize='0.7rem' color='blackAlpha.600' fontWeight='400'>
          {/*  display elapsed time in good way */}
          Il y a 2 jours
        </Text>
      </Stack>
    </MenuItem>
  );
}
