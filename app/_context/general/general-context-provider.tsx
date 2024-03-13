'use client'

import React, { FC, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum SidebarState {
  COLLAPSED = 'collapsed',
  EXPANDED = 'expanded',
}

type GeneralContextType = {
  theme: Theme;
  toggleTheme: () => void;
  sidebarState: SidebarState;
  toggleSidebarState: () => void;
}

export interface GeneralProviderProps {
  children: React.ReactNode;
}

export const THEME_ACTIVE_LOCAL_STORAGE_KEY = 'theme_active'
export const SIDEBAR_STATE_LOCAL_STORAGE_KEY = 'sidebar_state'

const getThemeFromLocalStorage = (): Theme => {
  if (typeof window === 'undefined') {
    return Theme.DARK
  }

  const theme = localStorage.getItem(THEME_ACTIVE_LOCAL_STORAGE_KEY)
  if (!theme || !Object.values(Theme).includes(theme as Theme)) {
    return Theme.DARK
  }

  return theme as Theme
}

const isSidebarCollapseFromLocalStorage = (): SidebarState => {
  if (typeof window === 'undefined') {
    return SidebarState.COLLAPSED
  }

  const sidebarState = localStorage.getItem(SIDEBAR_STATE_LOCAL_STORAGE_KEY)
  if (!sidebarState || !Object.values(SidebarState).includes(sidebarState as SidebarState)) {
    return SidebarState.COLLAPSED
  }

  return sidebarState as SidebarState
}

const GeneralContext = createContext<GeneralContextType | undefined>(undefined)

export const useGeneralContext = () => {
  const context = useContext(GeneralContext)
  if (!context) {
    throw new Error('useGeneralContext must be used within a GeneralContextProvider')
  }

  return context
}

export const GeneralContextProvider: FC<GeneralProviderProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>(getThemeFromLocalStorage)
  const [sidebarState, setSidebarState] = useState<SidebarState>(isSidebarCollapseFromLocalStorage)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    localStorage.setItem(THEME_ACTIVE_LOCAL_STORAGE_KEY, theme)
    document.body.setAttribute('data-theme', theme);
  }, [theme])

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STATE_LOCAL_STORAGE_KEY, sidebarState)
  }, [sidebarState])

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  }, []);

  const toggleSidebarState = useCallback(() => {
    setSidebarState((prevState) => (prevState === SidebarState.COLLAPSED ? SidebarState.EXPANDED : SidebarState.COLLAPSED));
  }, []);

  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
    sidebarState,
    toggleSidebarState
  }), [theme, toggleTheme, sidebarState, toggleSidebarState])

  return (
    <GeneralContext.Provider value={contextValue}>
      {mounted && <>{children}</>}
    </GeneralContext.Provider>
  )
}