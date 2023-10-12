export const SITE_URL =
  process.env.VERCEL_URL! || process.env.NEXT_PUBLIC_SITE_URL!;

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
