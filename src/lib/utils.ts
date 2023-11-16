import { ReadonlyURLSearchParams, useRouter } from 'next/navigation';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { WEB_SOCKET_URL } from '@/lib/server-route';

import {
  AppNotification,
  PaginatedNotifications,
  ScholarshipCode,
  ScholarshipCodeRow,
  ScholarshipPeriod,
} from '@/types/app.types';

export const SEARCH_QUERY_PARAM_NAME = 'q';
export const matriculeRegexp = /^\d{8}$/;
export const fullRegex =
  /^(\d{8}|^[\sA-Za-zÀ-ÖØ-öø-ÿ][\sA-Za-zÀ-ÖØ-öø-ÿ\d-_]*)$/;

export function updateUrlParams(
  string_: string,
  router: ReturnType<typeof useRouter>,
  pathname: string,
  searchParameters: ReadonlyURLSearchParams,
) {
  const typed = string_.trim();
  if (!typed.trim()) {
    const newParameters = new URLSearchParams(searchParameters);
    newParameters.delete(SEARCH_QUERY_PARAM_NAME);
    const newUrl = `${pathname}?${newParameters.toString()}`;
    router.replace(newUrl);
    return;
  }
  const newParameters = new URLSearchParams(searchParameters);
  // just update the query params without reloading the page
  newParameters.set(SEARCH_QUERY_PARAM_NAME, typed.trim());
  const newUrl = `${pathname}?${newParameters.toString()}`;
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

export const capitalize = (string_: string) =>
  string_.charAt(0).toUpperCase() + string_.slice(1).toLowerCase();

export function capitalizeEachWord(string_: string) {
  // eslint-disable-next-line unicorn/no-array-callback-reference
  return string_.split(' ').map(capitalize).join(' ');
}

export function upperCaseEachWord(string_: string) {
  return string_
    .split(' ')
    .map((s) => s.toUpperCase())
    .join(' ');
}

export const camelCaseToTitleCase = (
  string_: string,
  mode: 'uppercase' | 'titleCase',
) => {
  const regex = /([A-Z])(?=[A-Z][a-z])|([a-z])(?=[A-Z])/g;
  if (mode === 'titleCase') {
    return capitalizeEachWord(string_.replaceAll(regex, '$& '));
  }
  return upperCaseEachWord(string_.replaceAll(regex, '$& '));
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
  const regex = /^#[\dA-Fa-f]{6}$/;
  if (!regex.test(hex)) {
    throw new Error('Invalid hexadecimal color string.');
  }

  const hasHash = hex[0] === '#';
  let hexWithoutHash = hex;
  if (hasHash) {
    hexWithoutHash = hex.slice(1);
  }

  const red = Number.parseInt(hexWithoutHash.slice(0, 2), 16);
  const green = Number.parseInt(hexWithoutHash.slice(2, 4), 16);
  const blue = Number.parseInt(hexWithoutHash.slice(4, 6), 16);

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
    console.error('Error copying to clipboard:', error);
    return false;
  }
}

export function removeExtraSpaces(string_: string) {
  return string_.replaceAll(/\s+/g, ' ').trim();
}

export function csvToScholarshipCode(
  oneRow: ScholarshipCodeRow,
  period: ScholarshipPeriod,
) {
  const [country, matricule, name, , ,] = oneRow;
  const [, , , numberPassport, periodCode, scholarshipCode] = oneRow;
  const codeRow: ScholarshipCode & { numPassport: string } = {
    country,
    matricule,
    name,
    periodCode,
    scholarshipCode,
    numPassport: numberPassport,
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
    case MonthsEnum.OCTOBER: {
      return 'septembre';
    }
    case MonthsEnum.NOVEMBER:
    case MonthsEnum.DECEMBER: {
      return 'novembre';
    }
    case MonthsEnum.JANUARY:
    case MonthsEnum.FEBRUARY: {
      return 'janvier';
    }
    case MonthsEnum.MARCH:
    case MonthsEnum.APRIL: {
      return 'mars';
    }
    case MonthsEnum.MAY:
    case MonthsEnum.JUNE: {
      return 'mai';
    }
    case MonthsEnum.JULY:
    case MonthsEnum.AUGUST: {
      return 'juin';
    }
    default: {
      throw new Error(`Unexpected value: ${month}`);
    }
  }
}

export function genSequences(startAt = 0) {
  let index = startAt;
  return () => {
    // eslint-disable-next-line no-plusplus
    return index++;
  };
}

export function getSeverityColor(severity: AppNotification['severity']) {
  if (severity === 'SUCCESS') {
    return 'primary.light';
  }
  if (severity === 'ERROR' || severity === 'WARNING') {
    return 'warning.main';
  }
  return 'blue.500';
}

export function crateWebsocketConnection() {
  const socket = new SockJS(WEB_SOCKET_URL);
  return Stomp.over(socket);
}

export function atLeastOneNotifIsNotRead(body: PaginatedNotifications) {
  return body.notifications.some((notif) => !notif.isRead);
}
