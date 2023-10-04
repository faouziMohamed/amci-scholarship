import path from 'path';

const BACKEND_BASE_API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL! || 'http://localhost:8080';

export const BACKEND_API_ROUTE = `${BACKEND_BASE_API_URL}/api/v1`;
export const POST_CODES_ROUTE = `${BACKEND_API_ROUTE}/codes`;

export const BASE_API_ROUTE = '/api/v1';
export const DATA_INIT_ROUTE = `${BASE_API_ROUTE}/data-init`;
export const CSV_FILE_PATH = path.join(
  process.cwd(),
  'src/Repository/data/code_amci.csv',
);

export const GET_CODES_ROUTE = `${BASE_API_ROUTE}/codes`;
