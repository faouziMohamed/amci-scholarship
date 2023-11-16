/* eslint-disable @typescript-eslint/no-misused-promises */

'use client';

import { Stack } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  FORGOT_PASSWORD_PAGE,
  HOME_PAGE,
  SIGNUP_PAGE,
} from '@/lib/client-route';

import AuthLayout from '@/app/(landing_page)/layout/AuthLayout';
import AppFormControl from '@/Components/form/AppFormControl';
import {
  passwordInputError,
  passwordRegex,
} from '@/Components/form/PasswordInput';

import { AuthSignIn, LoginBody } from '@/types/app.types';

type AppAuthSignInUser = LoginBody;
const defaultValues: AppAuthSignInUser = { email: '', password: '' };
type FormLoginProps = { redirectTo?: string | null };

export function LoginForm({ redirectTo }: FormLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppAuthSignInUser>({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues,
    shouldFocusError: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [anyErrors, setAnyErrors] = useState<string[] | undefined>(undefined);
  const params = useSearchParams();
  const onSubmit = useCallback(
    async (values: AppAuthSignInUser) => {
      setAnyErrors(undefined);
      setIsSubmitting(true);
      const data: AuthSignIn = {
        email: values.email.trim().toLowerCase(),
        password: values.password,
        action: 'SIGN_IN',
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
    <Stack>
      <AuthLayout
        onSubmit={handleSubmit(onSubmit)}
        submitButtonTitle='Se connecter'
        isSubmitting={isSubmitting}
        formTitle='Se connecter'
        formAltAction={{
          text: 'Pas encore de compte?',
          link: SIGNUP_PAGE,
          linkText: "S'inscrire",
        }}
        formAltAction2={{
          text: 'Mot de passe oublié?',
          link: FORGOT_PASSWORD_PAGE,
          linkText: 'Réinitialiser',
        }}
        errors={anyErrors}
      >
        <AppFormControl
          isRequired
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
          autoComplete='current-password'
          isRequired
          label='Password'
          placeholder='Votre mot de passe'
          type='password'
          error={errors.password}
          register={register('password', {
            required: true,
            pattern: passwordRegex,
          })}
          displayError={passwordInputError}
        />
      </AuthLayout>
    </Stack>
  );
}
