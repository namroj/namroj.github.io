'use client'

import { ReactNode } from 'react'

import { ExpandCollapseState, useExpandCollapseContext } from '@/app/_context-providers/expand-collapse/ExpandCollapseProvider'

import styles from './Main.module.scss'

export default function Main({ children }: Readonly<{ children: ReactNode }>) {
  const { expandCollapseState } = useExpandCollapseContext()

  const getCollapsedOrExpandedState = () =>
    expandCollapseState === ExpandCollapseState.COLLAPSED ? ExpandCollapseState.EXPANDED : ExpandCollapseState.COLLAPSED

  return <main className={`${styles.main} ${styles[getCollapsedOrExpandedState()]}`}>{children}</main>
}
