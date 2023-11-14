'use client';

import {
  Card,
  CardBody,
  chakra,
  Flex,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { useCopyToClipBoardToast } from '@/Components/componentFactory';
import { CodeAndMatriculeBarChart } from '@/Components/dashboard/CodeAndMatriculeBarChart';
import { DashboardWidgetSummary } from '@/Components/dashboard/dashboardWidgetSummary';
import { HistoryImport } from '@/Components/dashboard/HistoryImport';
import { getStats } from '@/Services/stats.service';

import personStanding from '~/images/person-standing.png';

import { AppStats } from '@/types/app.types';

const Image = chakra(NextImage);

export function DashboardStats() {
  const { data: session } = useSession();
  const { user } = session!;
  const [stats, setStats] = useState<AppStats>({} as AppStats);
  const toast = useCopyToClipBoardToast();
  useEffect(() => {
    void getStats(user.token)
      .then((fetchedStats) => {
        setStats(fetchedStats);
        return fetchedStats;
      })
      .catch(() => {
        toast({
          title: 'Erreur de chargement des statistiques',
          description: 'Veuillez réessayer plus tard',
          status: 'error',
        });
      });
  }, [toast, user.token]);

  return (
    <>
      <DashboardWidgetSummary stats={stats} />
      <Flex
        id='update-and-stats'
        w='100%'
        flexDirection={{ base: 'column', xmd: 'row' }}
        gap='1.5rem'
        justifyContent='center'
      >
        <Card
          bgColor='rgb(245, 247, 255)'
          flexShrink={0}
          flexBasis={{ xmd: '55%', lg: '60%', xlg: '55%' }}
          transition='all 0.3s ease'
          id='update-notice'
        >
          <CardBody as={Stack} alignItems='center' justifyContent='center'>
            <Image width={200} src={personStanding} alt='Persone saying hi' />
            <Text
              as='h3'
              fontSize='1.2rem'
              color='primary.light'
              fontWeight={600}
            >
              Mis à jour
            </Text>
            <Text color='blackAlpha.800' textAlign='center'>
              De nouveaux statistiques seront ajoutées prochainement ainsi que
              de nouveaux fonctionnalitées , Options, filtres, recherche, etc...
            </Text>
          </CardBody>
        </Card>
        <Card flexGrow={1}>
          <CardBody>
            <VStack>
              <Text as='h2' fontSize='1rem' textAlign='center' fontWeight={600}>
                Nombre de codes et de matricules
              </Text>
              <CodeAndMatriculeBarChart />
            </VStack>
          </CardBody>
        </Card>
      </Flex>
      <HistoryImport user={user} stats={stats} />
    </>
  );
}
