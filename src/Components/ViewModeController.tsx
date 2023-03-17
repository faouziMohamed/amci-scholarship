'use client';

import { ButtonGroup, IconButton } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RiLayoutGridFill } from 'react-icons/ri';
import { TbLayoutList } from 'react-icons/tb';

import {
  VIEW_MODE_QUERY_NAME,
  VIEW_MODE_STORAGE_KEY,
  ViewMode,
} from '@/types/app.types';

export function ViewModeController() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  let viewMode = params.get('view') as ViewMode;
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const updateViewMode = (mode: ViewMode) => {
    params.set(VIEW_MODE_QUERY_NAME, mode);
    const newUrl = `${pathname}?${params.toString()}`;
    void router.push(newUrl);
    localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode);
  };

  useEffect(() => {
    setMounted(true);
    if (viewMode) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    viewMode = localStorage.getItem(VIEW_MODE_STORAGE_KEY) as ViewMode;
    if (!viewMode) {
      viewMode = 'list';
    }
    updateViewMode(viewMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  return (
    <ButtonGroup>
      <IconButton
        aria-label='Set view to list mode'
        title='List mode'
        onClick={() => updateViewMode('list')}
        isDisabled={!mounted || viewMode === 'list'}
        colorScheme='teal'
      >
        <TbLayoutList />
      </IconButton>
      <IconButton
        aria-label='Set view to table mode'
        title='Table mode'
        onClick={() => updateViewMode('grid')}
        isDisabled={!mounted || viewMode === 'grid'}
        colorScheme='teal'
      >
        <RiLayoutGridFill />
      </IconButton>
    </ButtonGroup>
  );
}
