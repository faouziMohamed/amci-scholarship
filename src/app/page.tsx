// app/page.tsx

'use client';

import { Box, Heading, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { fullRegex } from '@/lib/utils';

import Header from '@/Components/Header';
import PageHeading from '@/Components/PageHeading';
import AppFormControl from '@/Components/TextField/AppFormControl';

type SearchCodeFields = {
  codeOrName: string;
};

function useFormHook() {
  const form = useForm<SearchCodeFields>({
    mode: 'all',
    defaultValues: { codeOrName: '' },
  });
  const { register, formState, watch } = form;
  return { register, errors: formState.errors, watch };
}

function SearchCode() {
  const { register, errors, watch } = useFormHook();

  const typed = watch('codeOrName');
  return (
    <Stack w='100%' alignItems='center'>
      <AppFormControl
        isRequired
        error={errors.codeOrName}
        register={register('codeOrName', {
          required: true,
          pattern: fullRegex,
          maxLength: Number(typed) ? 8 : 100,
        })}
        placeholder='Nom complet ou Numéro de matricule'
      />
    </Stack>
  );
}

export default function HomePage() {
  return (
    <Box>
      <Header />

      <Stack spacing='2rem' as='main' px='1.5rem' py='3rem'>
        <PageHeading />
        <Stack alignItems='center' gap='1rem' as='section' pt='5rem'>
          <Heading
            as='h3'
            fontSize='1.1rem'
            textAlign='center'
            borderBlockEnd='medium'
            borderBlockEndColor='primary.light'
            borderBlockEndStyle='solid'
            display='inline-block'
            pb={0}
          >
            Veuillez saisir votre nom complet ou votre Numéro de matricule
          </Heading>

          <SearchCode />
        </Stack>
      </Stack>
    </Box>
  );
}
