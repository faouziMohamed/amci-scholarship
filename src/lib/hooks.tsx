import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import {
  createAbortController,
  SEARCH_QUERY_PARAM_NAME,
  updateUrlParams,
} from '@/lib/utils';

import {
  getCodes,
  getCodesFromSessionStorage,
  saveNewCodeToSessionStorage,
} from '@/Services/codes.service';

import {
  FetchedCodes,
  VIEW_MODE_STORAGE_KEY,
  ViewMode,
} from '@/types/app.types';

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

export function useFetchedCodes(
  typed: string,
  errors: FieldErrors<SearchCodeFields>,
) {
  const [result, setResult] = useState<FetchedCodes>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const abort = createAbortController();
    const { controller, abortSignal, isSignalAborted } = abort;

    if (!typed?.trim() || errors.codeOrName) {
      setResult({ codes: [], totalCount: 0, nextPage: -1 });
      if (searchParams.get(SEARCH_QUERY_PARAM_NAME)?.trim()) {
        updateUrlParams('', router, pathname, searchParams);
      }
      return abortSignal;
    }

    if (!isSignalAborted()) {
      updateUrlParams(typed, router, pathname, searchParams);
    }
    const found = getCodesFromSessionStorage(typed);
    if (found.totalCount > 0) {
      setResult(found);
      return abortSignal;
    }

    const params = new URLSearchParams({
      [SEARCH_QUERY_PARAM_NAME]: typed.trim(),
    });
    void getCodes(params, controller.signal).then((data) => {
      if (!isSignalAborted()) {
        if (data.totalCount > 0) {
          setResult(data);
          saveNewCodeToSessionStorage(data);
        }
      }
      return null;
    });

    return abortSignal;
  }, [errors.codeOrName, pathname, router, searchParams, typed]);
  return result;
}

export function useSearchParamFromUrlOnMount() {
  const queries = useSearchParams();
  return queries.get('q') || '';
}

export function useViewMode() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  let viewMode = params.get('view') as ViewMode;
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
