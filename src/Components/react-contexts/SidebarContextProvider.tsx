'use client';

import { useMediaQuery } from '@chakra-ui/react';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface SidebarContextProps {
  opened: boolean;
  toggle: () => void;
  setOpened: (opened: boolean) => void;
}

const sidebarContext = createContext<SidebarContextProps>({
  opened: false,
  toggle: () => {},
  setOpened: () => {},
} as SidebarContextProps);

export function useSidebarContext() {
  return useContext(sidebarContext);
}

export function SidebarContextProvider({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const toggle = useMemo(() => () => setOpened((prev) => !prev), []);
  const value = useMemo(
    () => ({ opened, toggle, setOpened }),
    [opened, toggle, setOpened],
  );
  return (
    <sidebarContext.Provider value={value}>{children}</sidebarContext.Provider>
  );
}

export function useSidebarMediaQueryIsSmallScreen() {
  const [isSmallScreen] = useMediaQuery('(max-width: 548px)', {
    fallback: false,
    ssr: false,
  });
  return isSmallScreen;
}
