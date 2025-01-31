'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IoHeadsetSharp } from 'react-icons/io5';

export interface NavigationProviderProps {
  children: ReactNode;
}

export interface Breadcrumb {
  label: string;
  href?: string;
  icon: ReactNode;
}

type NavigationContextType = {
  breadcrumbs: Breadcrumb[];
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      'useNavigationContext must be used within a NavigationProvider',
    );
  }

  return context;
};

export function NavigationContextProvider({
  children,
}: NavigationProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [enhancedBreadcrumbs, setEnhancedBreadcrumbs] = useState<Breadcrumb[]>(
    [],
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (breadcrumbs.length === 0) {
      setEnhancedBreadcrumbs([]);
      return;
    }

    setEnhancedBreadcrumbs([
      { label: 'Jorman', href: '/', icon: <IoHeadsetSharp /> },
      ...breadcrumbs,
    ]);
  }, [breadcrumbs]);

  const contextValue = useMemo(
    () => ({
      breadcrumbs: enhancedBreadcrumbs,
      setBreadcrumbs,
    }),
    [enhancedBreadcrumbs, setBreadcrumbs],
  );

  return (
    <NavigationContext.Provider value={contextValue}>
      {mounted && children}
    </NavigationContext.Provider>
  );
}
