'use client';

// chart options
import { Box } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import { useCopyToClipBoardToast } from '@/Components/componentFactory';
import { getStats } from '@/Services/stats.service';

const barChartOptions: ApexOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ['Nb Matricules', 'Nb Codes'],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
};

export function CodeAndMatriculeBarChart() {
  const [series, setSeries] = useState([{ data: [0, 0] }]);
  const [options, setOptions] = useState<ApexOptions>(barChartOptions);
  const { data: session } = useSession();
  const { user } = session!;
  const toast = useCopyToClipBoardToast();
  useEffect(() => {
    getStats(user.token)
      .then((fetchedStats) => {
        setSeries([
          { data: [fetchedStats.matriculesCount, fetchedStats.codesCount] },
        ]);
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

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: ['#5c6ac4'],
      xaxis: {
        labels: {
          style: {
            colors: ['#444', '#444'],
          },
        },
      },
      tooltip: {
        theme: 'light',
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box id='chart'>
      <ReactApexChart
        options={options}
        series={series}
        type='bar'
        height={365}
      />
    </Box>
  );
}
