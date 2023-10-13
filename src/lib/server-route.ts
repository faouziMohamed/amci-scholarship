import { ScholarshipPeriod } from '@/types/app.types';

const BACKEND_BASE_API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL! || 'http://localhost:8080';

export const BACKEND_API_ROUTE = `${BACKEND_BASE_API_URL}/api/v1`;

export const STATS_ROUTE = `${BACKEND_API_ROUTE}/stats`;
export const POST_CODES_ROUTE = `${BACKEND_API_ROUTE}/codes`;
export const SIGN_IN_ROUTE = `${BACKEND_API_ROUTE}/auth/login`;
export const SIGN_UP_ROUTE = `${BACKEND_API_ROUTE}/auth/register`;
export const IMPORT_HISTORY_ROUTE = `${BACKEND_API_ROUTE}/import-history`;

export const getUserRoute = (id: number) => `${BACKEND_API_ROUTE}/users/${id}`;

export const getCodesByMatriculeRoute = (
  matricule: string,
  page: number = 0,
  size: number = 5,
) => {
  const params = new URLSearchParams();
  params.append('size', size.toString());
  params.append('page', page.toString());
  return `${BACKEND_API_ROUTE}/codes/matricule/${matricule}?${params.toString()}`;
};

export const searchCodeByMatriculeOrNameAndPeriodRoute = (
  query: string,
  period: ScholarshipPeriod,
  page: number = 0,
  size: number = 10,
) => {
  const params = new URLSearchParams();
  params.append('query', query);
  params.append('period', period.toUpperCase());
  params.append('page', page.toString());
  params.append('size', size.toString());
  return `${BACKEND_API_ROUTE}/codes/search?${params.toString()}`;
};
