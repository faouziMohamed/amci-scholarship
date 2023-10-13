// import {
//   SIGN_UP_ROUTE,
//   getUserRoute,
//   LOGIN_ROUTE,
// } from '@/services/api-endpoints';
import {
  getUserListRoute,
  getUserRoute,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from '@/lib/server-route';

import {
  ApiErrorResponse,
  AppUser,
  AppUserWithToken,
  LoginResponse,
  RegistrationBody,
  RegistrationResponse,
} from '@/types/app.types';

export async function trySignIn(
  email: string,
  password: string,
): Promise<AppUserWithToken | ApiErrorResponse> {
  const response = await fetch(SIGN_IN_ROUTE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await readLoginResponse(response);
  if ('statusCode' in data) {
    return data;
  }

  const userData = await getUserData(data.user.id, data.jwtToken);
  if ('statusCode' in userData) {
    return userData;
  }
  const appUser = structuredClone(userData) as AppUserWithToken;
  appUser.token = data.jwtToken;
  appUser.tokenExpirationDate = data.tokenExpirationDate;
  return appUser;
}

export async function registerUser(
  newUser: RegistrationBody,
): Promise<AppUserWithToken | ApiErrorResponse> {
  const response = await fetch(SIGN_UP_ROUTE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    let errRes = (await response.json()) as ApiErrorResponse;
    if (!errRes) {
      errRes = {
        statusCode: 500,
        message: 'Une erreur a surgit pendant la requête',
      };
    }
    return errRes;
  }
  const data = (await response.json()) as RegistrationResponse;
  if (!data || !data.userId) {
    return { statusCode: 500, message: 'La création du compte a échoué' };
  }

  return trySignIn(newUser.email, newUser.password);
}

async function readLoginResponse(
  response: Response,
): Promise<LoginResponse | ApiErrorResponse> {
  if (!response.ok) {
    let errRes = (await response.json()) as ApiErrorResponse;
    if (!errRes) {
      errRes = { statusCode: 500, message: "Quelque-chose s'est mal passé" };
    }
    return errRes;
  }
  const data = (await response.json()) as LoginResponse;
  if (!data || !data.jwtToken) {
    return {
      statusCode: 500,
      message: "Quelque-chose s'est définitivement mal passé",
    };
  }
  return data;
}

export async function getUserData(
  userId: number,
  token: string,
): Promise<AppUser | ApiErrorResponse> {
  // get user data
  const userResponse = await fetch(getUserRoute(userId), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!userResponse.ok) {
    let errRes = (await userResponse.json()) as ApiErrorResponse;
    if (!errRes) {
      errRes = { statusCode: 500, message: 'La requête a échoué' };
    }
    return errRes;
  }
  return (await userResponse.json()) as AppUser;
}

export async function updateUser(
  user: Partial<AppUserWithToken> &
    Pick<AppUserWithToken, 'id' | 'token'> & { password?: string },
) {
  const response = await fetch(getUserRoute(user.id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    let errRes = (await response.json()) as ApiErrorResponse;
    if (!errRes) {
      errRes = {
        statusCode: 500,
        message: "La mise à jour n'a pas abouti à cause d'une erreur",
      };
    }
    return errRes;
  }
  return (await response.json()) as AppUser;
}

export async function getUsers(
  token: string,
  page: number,
  size: number,
): Promise<AppUser[]> {
  const url = getUserListRoute(page, size);
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const errRes = (await response.json()) as ApiErrorResponse;
    const msg =
      errRes.message ||
      'Impossible de récupérer la liste des utilisateurs pour le moment';
    throw new Error(msg);
  }
  return (await response.json()) as AppUser[];
}

// export function useUser(userId: number, token: string) {
//   return useSWR<AppUser | null, Error>(
//     getUserRoute(userId),
//     async () => {
//       const maybeUser = await getUserData(userId, token);
//       return 'code' in maybeUser ? null : maybeUser;
//     },
//     {
//       refreshWhenHidden: false,
//       refreshWhenOffline: false,
//       refreshInterval: 2 * 60 * 1000,
//     },
//   );
// }
