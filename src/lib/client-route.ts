// the vercel URL will not contain the protocol. here we need to check if the protocol is missing and add it

const isMissingProtocol = (url: string) => !url.startsWith('http');

export const addProtocol = (url: string) => {
  return isMissingProtocol(url) ? `https://${url}` : url;
};

// if the Vercel URL is missing, we will use the NEXT_PUBLIC_SITE_URL
const vercelURL = process.env.VERCEL_URL
  ? addProtocol(process.env.VERCEL_URL!)
  : '';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || vercelURL;

export const DASHBOARD_PAGE = '/dashboard';
export const PROFILE_PAGE = '/profile';
export const CODES_PAGE = '/codes';
export const USERS_PAGE = '/users';
export const SETTINGS_PAGE = '/settings';
export const SIGNUP_PAGE = '/signup';
export const SIGN_IN_PAGE = '/signin';
export const FORGOT_PASSWORD_PAGE = '/forgot-password';
export const HOME_PAGE = '/';
export const getSignInPageWithNext = (next: string) =>
  `${SIGN_IN_PAGE}?${new URLSearchParams({ next }).toString()}`;
