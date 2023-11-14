import { Card, CardBody } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

import Theme from '@/styles/theme';

import { AppStats } from '@/types/app.types';

const defaultLabels = ['Succès', 'Echec'];

export function OverViewImportHistory({ stats }: { stats: AppStats }) {
  const chartSeries = [
    stats.importHistorySuccessCount || 0,
    stats.importHistoryFailedCount || 0,
  ];
  const chartOptions = getChartOptions(defaultLabels);
  return (
    <Card flexGrow='1' w={{ base: '100%', xlg: 'auto' }}>
      <CardBody>
        <ReactApexChart
          height={300}
          options={chartOptions}
          series={chartSeries}
          type='donut'
          width='100%'
        />
      </CardBody>
    </Card>
  );
}

function getChartOptions(labels: string[]): ApexOptions {
  return {
    chart: {
      background: 'transparent',
    },
    colors: [Theme.colors.primary.main, Theme.colors.danger.main],
    dataLabels: {
      enabled: true,
    },
    title: {
      text: "Statistique de l'historique des imports",
      align: 'center',
      style: {
        fontFamily: 'inherit',
      },
    },
    labels,
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontFamily: 'inherit',
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
      },
    },
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: 'light',
    },
    tooltip: {
      fillSeriesColor: true,
    },
  };
}
