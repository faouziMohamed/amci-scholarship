import path from 'path';

export const BASE_API_ROUTE = '/api/v1';
export const DATA_INIT_ROUTE = `${BASE_API_ROUTE}/data-init`;
export const CSV_FILE_PATH = path.join(
  process.cwd(),
  'src/Repository/data/code_amci.csv',
);
