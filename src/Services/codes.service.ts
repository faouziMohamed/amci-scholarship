import {
  CHECK_CODE_IMPORT_STATUS_ROUTE,
  getCodesByMatriculeRoute,
  IMPORT_HISTORY_ROUTE,
  searchCodeByMatriculeOrNameAndPeriodRoute,
} from '@/lib/server-route';

import {
  AppUserWithToken,
  CodeImportStatus,
  ImportHistory,
  PaginatedScholarshipCode,
  ScholarshipPeriod,
} from '@/types/app.types';

export const defaultPaginatedScholarshipCode: PaginatedScholarshipCode = {
  codes: [],
  totalCodes: 0,
  totalPages: 0,
  nextPage: -1,
  pageSize: 0,
  currentCount: 0,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function searchCodes(
  query: string,
  period: ScholarshipPeriod,
  signal: AbortSignal,
  page = 0,
  size = 10,
) {
  const url = searchCodeByMatriculeOrNameAndPeriodRoute(
    query,
    period,
    page,
    size,
  );
  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      return defaultPaginatedScholarshipCode;
    }

    return (await response.json()) as PaginatedScholarshipCode;
  } catch {
    return defaultPaginatedScholarshipCode;
  }
}

export async function getCodesByMatricule(
  matricule: string,
  page: number = 0,
  size: number = 5,
): Promise<PaginatedScholarshipCode> {
  const url = getCodesByMatriculeRoute(matricule, page, size);
  const response = await fetch(url);
  if (!response.ok) {
    return defaultPaginatedScholarshipCode;
  }
  return (await response.json()) as PaginatedScholarshipCode;
}

export async function getImportHistory(
  token: string,
): Promise<ImportHistory[]> {
  const response = await fetch(IMPORT_HISTORY_ROUTE, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    return [];
  }
  return (await response.json()) as ImportHistory[];
}

export async function checkCodeImportStatus(
  user: AppUserWithToken,
): Promise<CodeImportStatus> {
  const response = await fetch(CHECK_CODE_IMPORT_STATUS_ROUTE, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  if (!response.ok) {
    return {
      status: 'FAILED',
      statusCode: response.status,
      message: 'Une erreur non attendu est survenue',
      timestamp: new Date().toDateString(),
      processedPercentage: -1,
    };
  }
  return (await response.json()) as CodeImportStatus;
}
