'use client'

import {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export enum Theme {
  AUTO = 'auto',
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ThemeLabel {
  AUTO = 'Automático',
  LIGHT = 'Claro',
  DARK = 'Oscuro',
}

type ThemeContextType = {
  theme: Theme
  toggleTheme: (theme: Theme) => void
}

export interface ThemeProviderProps {
  children: React.ReactNode
}

export const THEME_ACTIVE_LOCAL_STORAGE_KEY = 'theme_active'

const getThemeFromLocalStorage = (): Theme => {
  if (typeof window === 'undefined') {
    return Theme.AUTO
  }

  const theme = localStorage.getItem(THEME_ACTIVE_LOCAL_STORAGE_KEY)
  if (!theme || !Object.values(Theme).includes(theme as Theme)) {
    return Theme.AUTO
  }

  return theme as Theme
}

const setThemeAttribute = (theme: Theme) => {
  document.body.setAttribute('data-theme', theme)
  document.body.setAttribute(
    'data-darkreader-mode',
    theme === Theme.DARK ? 'dark' : 'light',
  )
  document.body.setAttribute(
    'data-darkreader-scheme',
    theme === Theme.DARK ? 'dark' : 'light',
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error(
      'useThemeContext must be used within a ThemeContextProvider',
    )
  }

  return context
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeContextProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>(getThemeFromLocalStorage)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (theme === Theme.AUTO) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const prefersColorSchemeListener = (event: MediaQueryListEvent) => {
        const currentTheme = event.matches ? Theme.DARK : Theme.LIGHT
        localStorage.setItem(THEME_ACTIVE_LOCAL_STORAGE_KEY, Theme.AUTO)
        toggleTheme(Theme.AUTO)
        setThemeAttribute(currentTheme)
      }

      localStorage.setItem(THEME_ACTIVE_LOCAL_STORAGE_KEY, Theme.AUTO)
      setThemeAttribute(mediaQuery.matches ? Theme.DARK : Theme.LIGHT)

      mediaQuery.addEventListener('change', prefersColorSchemeListener)
      return () =>
        mediaQuery.removeEventListener('change', prefersColorSchemeListener)
    }

    localStorage.setItem(THEME_ACTIVE_LOCAL_STORAGE_KEY, theme)
    setThemeAttribute(theme)
  }, [theme])

  const toggleTheme = useCallback((theme: Theme) => setTheme(theme), [])

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {mounted && <>{children}</>}
    </ThemeContext.Provider>
  )
}
