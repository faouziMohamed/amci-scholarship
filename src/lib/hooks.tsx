import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import {
  createAbortController,
  getCurrentScholarshipPeriod,
  removeExtraSpaces,
  updateUrlParams,
} from '@/lib/utils';
import {
  CODES_QUERY_PARAM_NAME,
  VIEW_MODE_QUERY_NAME,
  VIEW_MODE_STORAGE_KEY,
} from '@/lib/utils.constant';

import {
  defaultPaginatedScholarshipCode,
  searchCodes,
} from '@/Services/codes.service';

import { PaginatedScholarshipCode, ViewMode } from '@/types/app.types';

type SearchCodeFields = {
  codeOrName: string;
};

export function useSearchFormControl(defaultValues?: string) {
  const form = useForm<SearchCodeFields>({
    mode: 'onChange',
    defaultValues: { codeOrName: defaultValues },
  });
  const { register, formState, watch } = form;
  return { register, errors: formState.errors, watch };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function useFetchedCodes(
  errors: FieldErrors<SearchCodeFields>,
  str = '',
) {
  const [result, setResult] = useState<PaginatedScholarshipCode>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const typed = removeExtraSpaces(str);
  const currentPeriod = getCurrentScholarshipPeriod();
  useEffect(() => {
    // use abort signal to cancel ongoing fetch when the user types something new
    const abort = createAbortController();
    const { controller, abortSignal, isSignalAborted } = abort;
    // if no typed value or there is an error in the form, reset the result
    if (!typed || errors.codeOrName) {
      setResult(defaultPaginatedScholarshipCode);
      if (searchParams.get(CODES_QUERY_PARAM_NAME)?.trim()) {
        updateUrlParams('', router, pathname, searchParams);
      }
      return abortSignal;
    }

    if (!isSignalAborted()) {
      updateUrlParams(typed, router, pathname, searchParams);
    }

    void searchCodes(
      typed.trim(),
      currentPeriod,
      controller.signal,
      0,
      10,
    ).then((data) => {
      if (!isSignalAborted()) {
        // Trigger re-render in every case
        setResult(data);
      }
      return null;
    });

    return abortSignal;
  }, [currentPeriod, errors.codeOrName, pathname, router, searchParams, typed]);
  return result;
}

export function useSearchParamFromUrlOnMount() {
  const queries = useSearchParams();
  return queries.get(CODES_QUERY_PARAM_NAME) || '';
}

export function useViewMode() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  let viewMode = params.get(VIEW_MODE_QUERY_NAME) as ViewMode;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (viewMode) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    viewMode = localStorage.getItem(VIEW_MODE_STORAGE_KEY) as ViewMode;
    if (!viewMode) {
      viewMode = 'list';
    }
  }, [mounted, viewMode]);
  if (!mounted) return null;
  return viewMode;
}
