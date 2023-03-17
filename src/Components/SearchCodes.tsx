import { Stack } from '@chakra-ui/react';

import {
  useFetchedCodes,
  useSearchFormControl,
  useSearchParamFromUrlOnMount,
} from '@/lib/hooks';
import { fullRegex } from '@/lib/utils';

import DisplayResults from '@/Components/DisplayResults';
import AppFormControl from '@/Components/TextField/AppFormControl';
import { ViewModeController } from '@/Components/ViewModeController';

export default function SearchCodes() {
  const valueFromQuery = useSearchParamFromUrlOnMount();
  const { register, errors, watch } = useSearchFormControl(valueFromQuery);
  const typed = watch('codeOrName') || valueFromQuery;
  const result = useFetchedCodes(typed, errors);
  return (
    <Stack w='100%' alignItems='center'>
      <ViewModeController />
      <AppFormControl
        isRequired
        error={errors.codeOrName}
        register={register('codeOrName', {
          required: true,
          pattern: fullRegex,
          maxLength: Number(typed) ? 8 : 100,
        })}
        defaultValue={valueFromQuery}
        placeholder='Nom complet ou Numéro de matricule'
        displayError={{
          heading:
            'Soit vous saisissez un nom complet, soit vous saisissez un Numéro de matricule',
          rules: [
            'Le numéro de matricule doit être composé de chiffres uniquement',
            'Le matricule doit être composé de 8 chiffres',
            'Le nom complet peut être composé de lettres, chiffres et espaces',
          ],
        }}
      />
      {!errors.codeOrName && typed && result?.totalCount && (
        <DisplayResults
          nextPage={result.nextPage}
          codes={result.codes || []}
          totalCount={result.totalCount}
        />
      )}
    </Stack>
  );
}
