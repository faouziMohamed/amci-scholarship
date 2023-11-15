/* eslint-disable react/jsx-props-no-spreading */
import { Box, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { ChangeEventHandler } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import CustomFormControlErrorMessage, {
  CustomErrorMessageProps,
} from '@/Components/form/CustomFormControlErrorMessage';
import PasswordInput from '@/Components/form/PasswordInput';
import Theme from '@/styles/theme';

import { FormAutocomplete } from '@/types/app.types';

type AppFormControlProps = {
  error?: FieldError;
  register?: UseFormRegisterReturn;
  label?: string;
  placeholder: string;
  displayError?: CustomErrorMessageProps;
  isRequired?: boolean;
  type?: string;
  disabled?: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  autoComplete?: FormAutocomplete;
  defaultValue?: string;
};

export default function AppFormControl(props: AppFormControlProps) {
  const { error, label, placeholder, displayError } = props;
  const { register = {} as UseFormRegisterReturn } = props;
  const { isRequired = false, type: typ = 'text', disabled } = props;
  const { value, onChange, autoComplete, defaultValue } = props;
  const inputColor = error
    ? Theme.colors.danger.main
    : Theme.colors.primary.main;
  return (
    <FormControl isRequired={isRequired} isInvalid={!!error}>
      {!!label && <FormLabel>{label}</FormLabel>}
      {typ === 'password' ? (
        <PasswordInput
          hasError={!!error}
          placeholder={placeholder}
          register={register}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
        />
      ) : (
        <Box
          as={typ === 'textarea' ? Textarea : Input}
          isDisabled={disabled}
          _focusVisible={{
            borderColor: inputColor,
            boxShadow: `0 0 0 1px ${inputColor}`,
          }}
          autoComplete={autoComplete}
          {...(typ === 'textarea'
            ? {
                resize: 'vertical',
              }
            : {
                type: typ,
                value,
              })}
          placeholder={placeholder}
          value={value}
          {...register}
          {...{ onChange }}
          defaultValue={defaultValue}
          sx={{
            '&:disabled': {
              backgroundColor: 'gray.100',
              borderColor: 'gray.400',
              opacity: '0.6',
            },
          }}
        />
      )}
      {!!displayError && <CustomFormControlErrorMessage {...displayError} />}
    </FormControl>
  );
}
