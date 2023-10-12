import { registerUser, trySignIn } from '@/Services/user.service';

import { AuthSignIn, RegistrationBody } from '@/types/app.types';

export async function handleLoginRequest(credentials: AuthSignIn) {
  const { email, password } = credentials;
  const maybeUser = await trySignIn(email, password);
  if ('message' in maybeUser) {
    throw new Error(maybeUser.message);
  }
  return maybeUser;
}

export async function handleUserRegistration(credReg: RegistrationBody) {
  const { email, password, matricule, passportNumber } = credReg;
  const errors: string[] = [];
  if (!credReg.matricule) errors.push('Matricule');
  if (!credReg.email) errors.push('Adresse email');
  if (!credReg.password) errors.push('Mot de passe');
  if (!credReg.passportNumber) errors.push('Numéro de passeport');

  if (errors.length > 0)
    throw new Error(
      `${errors.join(', ')} ${errors.length > 1 ? 'sont' : 'est'} requis`,
    );

  const user: RegistrationBody = { email, password, matricule, passportNumber };
  const maybeUser = await registerUser(user);
  if (!('statusCode' in maybeUser)) {
    return maybeUser;
  }
  // noinspection UnnecessaryLocalVariableJS
  const errorJson = maybeUser.message;
  throw new Error(errorJson);
}
