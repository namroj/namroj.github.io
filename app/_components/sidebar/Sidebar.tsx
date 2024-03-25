'use client'

import { useExpandCollapseContext } from '@/app/_context-providers/expand-collapse/ExpandCollapseProvider'

import Nav from './nav/Nav'
import Toggler from './toggler/Toggler'
import Links from './links/Links'

import styles from './Sidebar.module.scss'

export default function Sidebar() {
  const { expandCollapseState } = useExpandCollapseContext()

  return (
    <aside className={`${styles.sidebar} ${styles[expandCollapseState]}`}>
      <Toggler />
      <Nav />
      <Links />
    </aside>
  )
}
