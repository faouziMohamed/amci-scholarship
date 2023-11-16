/* eslint-disable @typescript-eslint/no-misused-promises */

'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { HOME_PAGE, SIGN_IN_PAGE } from '@/lib/client-route';
import { matriculeRegexp } from '@/lib/utils';

import AuthLayout from '@/app/(landing_page)/layout/AuthLayout';
import AppFormControl from '@/Components/form/AppFormControl';
import {
  passwordInputError,
  passwordRegex,
} from '@/Components/form/PasswordInput';
import Loader from '@/Components/loader/Loader';

import { AuthSignUp, RegistrationBody } from '@/types/app.types';

type AppAuthSignUp = RegistrationBody;

export type RegistrationFormProps = {
  redirectTo?: string | null;
};

const defaultValues: AppAuthSignUp = {
  email: '',
  password: '',
  passportNumber: '',
  matricule: '',
};

export function RegisterForm(props: RegistrationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppAuthSignUp>({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues,
    shouldFocusError: true,
  });
  const { redirectTo = null } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [anyErrors, setAnyErrors] = useState<string[] | undefined>(undefined);
  const params = useSearchParams();
  const onSubmit = useCallback(
    async (values: AppAuthSignUp) => {
      setAnyErrors(undefined);
      setIsSubmitting(true);

      const data: AuthSignUp = {
        email: values.email.trim().toLowerCase(),
        password: values.password,
        passportNumber: values.passportNumber.trim().toUpperCase(),
        matricule: values.matricule.trim().toUpperCase(),
        action: 'SIGN_UP',
      };
      try {
        const sign = await signIn('credentials', { ...data, redirect: false });
        if (sign?.error) {
          setAnyErrors([sign.error]);
          return;
        }

        const newParams = new URLSearchParams(params.toString());
        const nextPath = newParams.get('next');
        if (nextPath) {
          newParams.delete('next');
        }
        window.location.href = redirectTo || nextPath || HOME_PAGE;
      } catch (error) {
        setAnyErrors([(error as Error).message]);
      } finally {
        setIsSubmitting(false);
      }
    },
    [params, redirectTo],
  );

  return (
    <AuthLayout
      onSubmit={handleSubmit(onSubmit)}
      submitButtonTitle='Créer un compte'
      isSubmitting={isSubmitting}
      formTitle='Activez votre compte'
      formAltAction={{
        text: 'Possédez-vous déjà un compte?',
        link: SIGN_IN_PAGE,
        linkText: "s'identifier",
      }}
      errors={anyErrors}
    >
      {isSubmitting && <Loader />}
      <AppFormControl
        isRequired
        disabled={isSubmitting}
        label='Matricule AMCI'
        placeholder='Votre matricule AMCI'
        error={errors.matricule}
        register={register('matricule', {
          required: true,
          pattern: matriculeRegexp,
        })}
        displayError={{
          heading: 'Saisissez un numéro de matricule valide',
          rules: [
            'Le numéro de matricule doit être composé de chiffres uniquement',
            'Le matricule doit être composé de 8 chiffres',
          ],
        }}
      />

      <AppFormControl
        isRequired
        disabled={isSubmitting}
        label='Numéro de passeport'
        placeholder='Passeport enregistré à l’AMCI'
        error={errors.passportNumber}
        register={register('passportNumber', { required: true })}
        displayError={{ heading: 'Le numéro de passeport est requis.' }}
      />
      <AppFormControl
        isRequired
        disabled={isSubmitting}
        label='Adresse email'
        placeholder='Votre adresse email'
        error={errors.email}
        type='email'
        autoComplete='email'
        register={register('email', {
          required: true,
          pattern: /^[\w.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,4}$/,
        })}
        displayError={{ heading: 'Adresse email invalide' }}
      />
      <AppFormControl
        isRequired
        disabled={isSubmitting}
        label='Password'
        placeholder='your password'
        type='password'
        error={errors.password}
        autoComplete='new-password'
        register={register('password', {
          required: true,
          pattern: passwordRegex,
        })}
        displayError={passwordInputError}
      />
    </AuthLayout>
  );
}
