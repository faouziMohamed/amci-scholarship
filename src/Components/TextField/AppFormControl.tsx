'use client';

/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import CustomFormControlErrorMessage, {
  CustomErrorMessageProps,
} from '@/Components/TextField/CustomFormControlErrorMessage';

type AppFormControlProps = {
  error?: FieldError;
  register?: UseFormRegisterReturn;
  label?: string;
  placeholder: string;
  displayError?: CustomErrorMessageProps;
  isRequired?: boolean;
  disabled?: boolean;
  type?: string;
  defaultValue?: string;
};

export default function AppFormControl(props: AppFormControlProps) {
  const { error, label, placeholder, displayError } = props;
  const { register = {} as UseFormRegisterReturn } = props;
  const { isRequired = false, disabled } = props;
  const { type: typ, defaultValue } = props;
  const inputColor = error ? 'danger.main' : 'primary.main';
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={!!error}
      maxW='33.5rem'
      w='100%'
    >
      {!!displayError && <CustomFormControlErrorMessage {...displayError} />}
      {!!label && <FormLabel>{label}</FormLabel>}
      <Input
        isDisabled={disabled}
        _focusVisible={{
          borderColor: inputColor,
          boxShadow: `0 0 0 1px ${inputColor}`,
        }}
        type={typ}
        placeholder={placeholder}
        {...register}
        defaultValue={defaultValue}
        sx={{
          '&:disabled': {
            backgroundColor: 'gray.100',
            borderColor: 'gray.400',
            opacity: '0.6',
          },
        }}
      />
    </FormControl>
  );
}
