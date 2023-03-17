import { ReadonlyURLSearchParams, useRouter } from 'next/navigation';

export const DEFAULT_PAGE_SIZE = 10;
export const SEARCH_QUERY_PARAM_NAME = 'q';
export const matriculeRegexp = /^\d{8}$/;
export const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+[a-zA-ZÀ-ÖØ-öø-ÿ\s\d-_]+$/;
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
    void router.replace(newUrl);
    return;
  }
  const newParams = new URLSearchParams(searchParams);
  // just update the query params without reloading the page
  newParams.set(SEARCH_QUERY_PARAM_NAME, typed.trim());
  const newUrl = `${pathname}?${newParams.toString()}`;
  void router.replace(newUrl);
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

export function getNextPage(page: number, count: number) {
  return DEFAULT_PAGE_SIZE * (Number(page) + 1) < count ? Number(page) + 1 : -1;
}

export function isNotAPossibleMatricule(q: string) {
  return q.at(0)?.match(/\d/) && (q.length > 8 || Number.isNaN(Number(q)));
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

export function formatNumber(value: string) {
  return Number(value) //
    .toLocaleString('en-US')
    .replaceAll(',', '-');
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
