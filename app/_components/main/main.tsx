'use client'

import { ReactNode } from 'react'

import { useGeneralContext } from '@/app/_context'
import { SidebarState } from '@/app/_context/general/general-context-provider'

import styles from './main.module.scss'

export default function Main({ children }: Readonly<{ children: ReactNode }>) {
  const { sidebarState } = useGeneralContext()

  const getCollapsedOrExpandedState = () =>
    sidebarState === SidebarState.COLLAPSED ? SidebarState.EXPANDED : SidebarState.COLLAPSED

  return <main className={`${styles.main} ${styles[getCollapsedOrExpandedState()]}`}>{children}</main>
}
