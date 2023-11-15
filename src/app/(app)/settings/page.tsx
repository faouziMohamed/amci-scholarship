'use client';

import {
  Box,
  Flex,
  Portal,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

import { NotificationModal } from '@/app/(app)/settings/NotificationModal';
import { ElevatedContainer } from '@/Components/ElevatedContainer';

export default function SettingsPage() {
  return (
    <VStack h='100%' w='100%' py='2rem' overflowY='auto' spacing='1rem'>
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
          Mon compte
        </Text>
        <Stack
          w='100%'
          gap='1rem'
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Box
            flexBasis={{ md: '60%' }}
            padding='6'
            boxShadow='lg'
            bg='white'
            w='100%'
          >
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </Box>
          <ElevatedContainer gap='1rem' flexGrow={0} flexBasis='40%'>
            <Skeleton height='90px' />
            <Skeleton height='20px' />
            <Flex w='100%' gap='0.5rem'>
              <Skeleton w='3rem' height='10px' />
              <Skeleton height='10px' />
            </Flex>
          </ElevatedContainer>
        </Stack>
        <Stack w='100%'>
          <Skeleton w='100px' height='10px' rounded='sm' />
          <Skeleton height='40px' rounded='md' />

          <Skeleton mt='0.5rem' w='100px' height='10px' rounded='sm' />
          <Skeleton height='40px' rounded='md' />
        </Stack>
        <Portal>
          <NotificationModal opened />
        </Portal>
      </VStack>
    </VStack>
  );
}
