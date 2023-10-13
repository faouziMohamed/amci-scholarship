'use client';

import { chakra, Icon, SimpleGrid } from '@chakra-ui/react';
import NextImage from 'next/image';
import { RiAdminFill } from 'react-icons/ri';

import AppWidgetSummary from '@/Components/dashboard/AppWidgetSummary';

import glassUsers from '~/images/glass_users.png';
import id from '~/images/id.png';
import messages from '~/images/messages.png';

import { AppStats } from '@/types/app.types';

const Image = chakra(NextImage);

export function DashboardWidgetSummary({ stats }: { stats: AppStats }) {
  const { adminsCount, codesCount, matriculesCount, usersCount } = stats;
  return (
    <SimpleGrid
      alignSelf='center'
      w='100%'
      spacing='0.5rem'
      templateColumns={{
        base: '1fr',
        md: '1fr 1fr',
        xl: '1fr 1fr 1fr 1fr',
      }}
      templateRows='auto'
      alignItems='center'
      alignContent='center'
      justifyContent='center'
    >
      <AppWidgetSummary
        minH='6.75rem'
        title={"Nombre total d'utilisateurs"}
        total={usersCount}
        icon={<Image alt='app users' src={glassUsers} />}
      />
      <AppWidgetSummary
        minH='6.75rem'
        title={"Nombre d'admins"}
        total={adminsCount}
        icon={<Icon fontSize='3.5rem' color='primary.main' as={RiAdminFill} />}
      />

      <AppWidgetSummary
        minH='6.75rem'
        title='Nombre de codes'
        total={codesCount}
        icon={<Image alt='app users' src={messages} />}
      />

      <AppWidgetSummary
        minH='6.75rem'
        title='Nombre de matricules'
        total={matriculesCount}
        icon={<Image width={16} height={16} alt='app users' src={id} />}
        flexGrow={1}
      />
    </SimpleGrid>
  );
}
