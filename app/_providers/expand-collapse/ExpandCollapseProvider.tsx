'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export enum ExpandCollapseState {
  COLLAPSED = 'collapsed',
  EXPANDED = 'expanded',
}

type ExpandCollapseContextType = {
  expandCollapseState: ExpandCollapseState;
  toggleExpandCollapseState: () => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  setMainWidth: (width: number) => void;
  mainWidth: number;
};

export interface ExpandCollapseProviderProps {
  children: ReactNode;
}

export const EXPAND_COLLAPSE_STATE_LOCAL_STORAGE_KEY = 'expand_collapse_state';

const getExpandCollapseStateFromLocalStorage = (): ExpandCollapseState => {
  if (typeof window === 'undefined') {
    return ExpandCollapseState.EXPANDED;
  }

  const expandCollapseState = localStorage.getItem(
    EXPAND_COLLAPSE_STATE_LOCAL_STORAGE_KEY,
  );

  if (
    !expandCollapseState ||
    !Object.values(ExpandCollapseState).includes(
      expandCollapseState as ExpandCollapseState,
    )
  ) {
    return ExpandCollapseState.COLLAPSED;
  }

  return expandCollapseState as ExpandCollapseState;
};

const ExpandCollapseContext = createContext<
  ExpandCollapseContextType | undefined
>(undefined);

export const useExpandCollapseContext = () => {
  const context = useContext(ExpandCollapseContext);
  if (!context) {
    throw new Error(
      'useExpandCollapseContext must be used within a ExpandCollapseContextProvider',
    );
  }

  return context;
};

export function ExpandCollapseContextProvider({
                                                children,
                                              }: ExpandCollapseProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [expandCollapseState, setExpandCollapseState] =
    useState<ExpandCollapseState>(getExpandCollapseStateFromLocalStorage);
  const [sidebarWidth, setSidebarWidth] = useState<number>(0);
  const [mainWidth, setMainWidth] = useState<number>(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    localStorage.setItem(
      EXPAND_COLLAPSE_STATE_LOCAL_STORAGE_KEY,
      expandCollapseState,
    );
  }, [expandCollapseState]);

  const toggleExpandCollapseState = useCallback(() => {
    setExpandCollapseState((prevState) =>
      prevState === ExpandCollapseState.COLLAPSED
        ? ExpandCollapseState.EXPANDED
        : ExpandCollapseState.COLLAPSED,
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      expandCollapseState,
      toggleExpandCollapseState,
      sidebarWidth,
      setSidebarWidth,
      setMainWidth,
      mainWidth,
    }),
    [
      expandCollapseState,
      toggleExpandCollapseState,
      sidebarWidth,
      setSidebarWidth,
      setMainWidth,
      mainWidth,
    ],
  );

  return (
    <ExpandCollapseContext.Provider value={contextValue}>
      {mounted && children}
    </ExpandCollapseContext.Provider>
  );
}
