'use client'

import { FC, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

export interface ThemeProviderProps {
  children: React.ReactNode
}

export const THEME_ACTIVE_LOCAL_STORAGE_KEY = 'theme_active'

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

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider')
  }

  return context
}

export const ThemeContextProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>(getThemeFromLocalStorage)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    localStorage.setItem(THEME_ACTIVE_LOCAL_STORAGE_KEY, theme)
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT))
  }, [])

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme
    }),
    [theme, toggleTheme]
  )

  return <ThemeContext.Provider value={contextValue}>{mounted && <>{children}</>}</ThemeContext.Provider>
}
