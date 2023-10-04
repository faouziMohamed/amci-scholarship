import { GET_CODES_ROUTE } from '@/lib/server-route';
import { getNextPage } from '@/lib/utils';
import { DEFAULT_PAGE_SIZE } from '@/lib/utils.constant';

import { FetchedCodes, ScholarshipCode } from '@/types/app.types';

export const DEFAULT_CODE_RESULT = { codes: [], totalCount: 0, nextPage: -1 };
const CODE_SESSION_STORAGE_KEY = 'saved-codes';

export async function getCodes(params: URLSearchParams, signal?: AbortSignal) {
  const url = `${GET_CODES_ROUTE}?${params.toString()}`;
  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      return DEFAULT_CODE_RESULT;
    }

    return (await response.json()) as FetchedCodes;
  } catch (error) {
    return DEFAULT_CODE_RESULT;
  }
}

function chooseHowManyToTake(foundCodes: ScholarshipCode[]) {
  return foundCodes.length > DEFAULT_PAGE_SIZE
    ? DEFAULT_PAGE_SIZE
    : foundCodes.length;
}

export function getCodesFromSessionStorage(
  str: string,
  page = 0,
): FetchedCodes {
  const toSearch = str.toUpperCase();
  const data = sessionStorage.getItem(CODE_SESSION_STORAGE_KEY) || '[]';
  const codes = JSON.parse(data) as ScholarshipCode[];
  const foundCodes = codes.filter(
    (code) =>
      code.name.includes(toSearch) || code.matricule.startsWith(toSearch),
  );
  // take the first DEFAULT_PAGE_SIZE results only and return
  const numberOfCodeToTake = chooseHowManyToTake(foundCodes);
  const indexToStartTaking = page * DEFAULT_PAGE_SIZE;
  const nextPage = getNextPage(page, foundCodes.length);
  const codesToReturn = foundCodes
    .slice(indexToStartTaking, numberOfCodeToTake)
    .sort((a, b) => a.name.localeCompare(b.name));

  return { codes: codesToReturn, totalCount: foundCodes.length, nextPage };
}

export function saveNewCodeToSessionStorage(newCodes: FetchedCodes) {
  // store the codes in the session storage if not already there
  const dataFromStore =
    sessionStorage.getItem(CODE_SESSION_STORAGE_KEY) || '[]';
  const codes = JSON.parse(dataFromStore) as ScholarshipCode[];
  const newToStore = newCodes.codes.filter(
    (code) => !codes.some((c) => c.matricule === code.matricule),
  );
  if (newToStore.length > 0) {
    sessionStorage.setItem(
      CODE_SESSION_STORAGE_KEY,
      JSON.stringify([...codes, ...newToStore]),
    );
  }
}
