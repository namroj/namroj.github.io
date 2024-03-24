'use client'

import { FC, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export enum ExpandCollapseState {
  COLLAPSED = 'collapsed',
  EXPANDED = 'expanded'
}

type ExpandCollapseContextType = {
  expandCollapseState: ExpandCollapseState
  toggleExpandCollapseState: () => void
}

export interface ExpandCollapseProviderProps {
  children: React.ReactNode
}

export const EXPAND_COLLAPSE_STATE_LOCAL_STORAGE_KEY = 'expand_collapse_state'

const getExpandCollapseStateFromLocalStorage = (): ExpandCollapseState => {
  if (typeof window === 'undefined') {
    return ExpandCollapseState.COLLAPSED
  }

  const expandCollapseState = localStorage.getItem(EXPAND_COLLAPSE_STATE_LOCAL_STORAGE_KEY)
  if (
    !expandCollapseState ||
    !Object.values(ExpandCollapseState).includes(expandCollapseState as ExpandCollapseState)
  ) {
    return ExpandCollapseState.COLLAPSED
  }

  return expandCollapseState as ExpandCollapseState
}

const ExpandCollapseContext = createContext<ExpandCollapseContextType | undefined>(undefined)

export const useExpandCollapseContext = () => {
  const context = useContext(ExpandCollapseContext)
  if (!context) {
    throw new Error('useExpandCollapseContext must be used within a ExpandCollapseContextProvider')
  }

  return context
}

export const ExpandCollapseContextProvider: FC<ExpandCollapseProviderProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  const [expandCollapseState, setExpandCollapseState] = useState<ExpandCollapseState>(
    getExpandCollapseStateFromLocalStorage
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    localStorage.setItem(EXPAND_COLLAPSE_STATE_LOCAL_STORAGE_KEY, expandCollapseState)
  }, [expandCollapseState])

  const toggleExpandCollapseState = useCallback(() => {
    setExpandCollapseState((prevState) =>
      prevState === ExpandCollapseState.COLLAPSED ? ExpandCollapseState.EXPANDED : ExpandCollapseState.COLLAPSED
    )
  }, [])

  const contextValue = useMemo(
    () => ({
      expandCollapseState,
      toggleExpandCollapseState
    }),
    [expandCollapseState, toggleExpandCollapseState]
  )

  return (
    <ExpandCollapseContext.Provider value={contextValue}>{mounted && <>{children}</>}</ExpandCollapseContext.Provider>
  )
}
