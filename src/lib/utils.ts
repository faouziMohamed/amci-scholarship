import { ReadonlyURLSearchParams, useRouter } from 'next/navigation';

import {
  ScholarshipCode,
  ScholarshipCodeRow,
  ScholarshipPeriod,
} from '@/types/app.types';

export const SEARCH_QUERY_PARAM_NAME = 'q';
export const matriculeRegexp = /^\d{8}$/;
export const fullRegex =
  /^(\d{8}|^[a-zA-ZÀ-ÖØ-öø-ÿ\s][a-zA-ZÀ-ÖØ-öø-ÿ\s\d-_]*)$/;

export function updateUrlParams(
  str: string,
  router: ReturnType<typeof useRouter>,
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
) {
  const typed = str.trim();
  if (!typed.trim()) {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(SEARCH_QUERY_PARAM_NAME);
    const newUrl = `${pathname}?${newParams.toString()}`;
    router.replace(newUrl);
    return;
  }
  const newParams = new URLSearchParams(searchParams);
  // just update the query params without reloading the page
  newParams.set(SEARCH_QUERY_PARAM_NAME, typed.trim());
  const newUrl = `${pathname}?${newParams.toString()}`;
  router.replace(newUrl);
}

export function createAbortController() {
  const abortController = new AbortController();
  const abort = () => abortController.abort();
  const isAborted = () => abortController.signal.aborted;
  return {
    controller: abortController,
    abortSignal: abort,
    isSignalAborted: isAborted,
  };
}

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export function capitalizeEachWord(str: string) {
  return str.split(' ').map(capitalize).join(' ');
}

export function upperCaseEachWord(str: string) {
  return str
    .split(' ')
    .map((s) => s.toUpperCase())
    .join(' ');
}

export const camelCaseToTitleCase = (
  str: string,
  mode: 'uppercase' | 'titleCase',
) => {
  const regex = /([A-Z])(?=[A-Z][a-z])|([a-z])(?=[A-Z])/g;
  if (mode === 'titleCase') {
    return capitalizeEachWord(str.replace(regex, '$& '));
  }
  return upperCaseEachWord(str.replace(regex, '$& '));
};

export function formatNumber(value: string, newSeparator = '-') {
  return Number(value) //
    .toLocaleString('en-US')
    .replaceAll(',', newSeparator);
}

export function adjustColor(
  hex: string,
  percent: number | null | undefined,
  opacityPercent?: number,
): string {
  if (
    (percent === null || percent === undefined) &&
    opacityPercent === undefined
  ) {
    throw new Error(
      'The percent parameter is required if opacityPercent is not provided.',
    );
  }
  const regex = /^#[0-9A-Fa-f]{6}$/;
  if (!regex.test(hex)) {
    throw new Error('Invalid hexadecimal color string.');
  }

  const hasHash = hex[0] === '#';
  let hexWithoutHash = hex;
  if (hasHash) {
    hexWithoutHash = hex.substring(1);
  }

  const red = parseInt(hexWithoutHash.substring(0, 2), 16);
  const green = parseInt(hexWithoutHash.substring(2, 4), 16);
  const blue = parseInt(hexWithoutHash.substring(4, 6), 16);

  const newRed = adjustComponent(red, percent);
  const newGreen = adjustComponent(green, percent);
  const newBlue = adjustComponent(blue, percent);

  const newHexWithoutHash =
    componentToHex(newRed) + componentToHex(newGreen) + componentToHex(newBlue);

  let opacityHex = '';
  if (opacityPercent !== undefined) {
    const opacityValue = Math.round((255 * opacityPercent) / 100);
    opacityHex = componentToHex(opacityValue);
  }

  return (hasHash ? '#' : '') + newHexWithoutHash + opacityHex;
}

export function adjustComponent(
  colorComponent: number,
  percent?: number | null,
): number {
  if (undefined === percent || percent === null) {
    return colorComponent;
  }
  const adjustedColor = colorComponent + Math.round((255 * percent) / 100);
  return Math.max(0, Math.min(255, adjustedColor));
}

export function componentToHex(colorComponent: number): string {
  let hex = colorComponent.toString(16).toUpperCase();
  if (hex.length === 1) {
    hex = `0${hex}`;
  }
  return hex;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error copying to clipboard: ', error);
    return false;
  }
}

export function removeExtraSpaces(str: string) {
  return str.replace(/\s+/g, ' ').trim();
}

export function csvToScholarshipCode(
  oneRow: ScholarshipCodeRow,
  period: ScholarshipPeriod,
) {
  const [country, matricule, name, , ,] = oneRow;
  const [, , , numPassport, periodCode, scholarshipCode] = oneRow;
  const codeRow: ScholarshipCode & { numPassport: string } = {
    country,
    matricule,
    name,
    periodCode,
    scholarshipCode,
    numPassport,
    period,
  };
  return codeRow;
}

export const csvFormat = [
  'Nationalité',
  'Numéro de matricule',
  'Nom et prénom',
  'Numéro du passeport',
  'Code du bourse (partie 1)',
  'Code du bourse (partie 2)',
] as const;

export const { log } = console;
export const ROLE_ID_OF = {
  USER: 0,
  ADMIN: 1,
} as const;

export function formattedDate(date: Date | string) {
  const dateToFormat = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return dateToFormat.toLocaleDateString('fr-FR', options);
}

//  public static ScholarshipPeriod getCurrentScholarshipPeriod() {
//     ZonedDateTime now = ZonedDateTime.now(ZoneId.of("UTC"));
//     int month = now.getMonthValue();
//
//     return switch (month) {
//       case SEPTEMBER, OCTOBER -> ScholarshipPeriod.SEPTEMBRE;
//       case JANUARY, FEBRUARY -> ScholarshipPeriod.JANVIER;
//       case MARCH, APRIL -> ScholarshipPeriod.MARS;
//       case MAY, JUNE -> ScholarshipPeriod.MAI;
//       case JULY, AUGUST -> ScholarshipPeriod.JUIN;
//       default -> throw new IllegalStateException("Unexpected value: " + month);
//     };
//   }
const MonthsEnum = {
  JANUARY: 1,
  FEBRUARY: 2,
  MARCH: 3,
  APRIL: 4,
  MAY: 5,
  JUNE: 6,
  JULY: 7,
  AUGUST: 8,
  SEPTEMBER: 9,
  OCTOBER: 10,
  NOVEMBER: 11,
  DECEMBER: 12,
} as const;

export function getCurrentScholarshipPeriod(): ScholarshipPeriod {
  const now = new Date();
  const month = now.getMonth() + 1;
  switch (month) {
    case MonthsEnum.SEPTEMBER:
    case MonthsEnum.OCTOBER:
      return 'septembre';
    case MonthsEnum.NOVEMBER:
    case MonthsEnum.DECEMBER:
      return 'novembre';
    case MonthsEnum.JANUARY:
    case MonthsEnum.FEBRUARY:
      return 'janvier';
    case MonthsEnum.MARCH:
    case MonthsEnum.APRIL:
      return 'mars';
    case MonthsEnum.MAY:
    case MonthsEnum.JUNE:
      return 'mai';
    case MonthsEnum.JULY:
    case MonthsEnum.AUGUST:
      return 'juin';
    default:
      throw new Error(`Unexpected value: ${month}`);
  }
}

export function genSequences(startAt = 0) {
  let i = startAt;
  return () => {
    // eslint-disable-next-line no-plusplus
    return i++;
  };
}
