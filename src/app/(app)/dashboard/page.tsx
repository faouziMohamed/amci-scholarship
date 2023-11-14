import { Text, VStack } from '@chakra-ui/react';

import { DashboardStats } from '@/Components/dashboard/DashboardStats';

export default function DashboardPage() {
  return (
    <VStack w='100%' alignItems='center' h='100%' py='2rem' overflow='auto'>
      <VStack
        textAlign='start'
        width='100%'
        maxW='90rem'
        mx='auto'
        alignItems='flex-start'
        px='1rem'
        spacing={10}
      >
        <Text as='h1' fontSize='1.5rem' fontWeight={600}>
          Dashboard
        </Text>
        <DashboardStats />
      </VStack>
    </VStack>
  );
}
