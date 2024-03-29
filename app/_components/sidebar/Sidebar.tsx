'use client'

import { useState, useEffect } from 'react'

import {
  ExpandCollapseState,
  useExpandCollapseContext
} from '@/app/_context-providers/expand-collapse/ExpandCollapseProvider'

import Nav from './nav/Nav'
import Toggler from './toggler/Toggler'
import Links from './links/Links'

import styles from './Sidebar.module.scss'

export default function Sidebar() {
  const { expandCollapseState } = useExpandCollapseContext()

  const [isResizing, setIsResizing] = useState(false)
  const [width, setWidth] = useState<string>('')

  const SIDEBAR_WIDTH_KEY = 'sidebar_width'

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        if (window.innerWidth < 768) {
          if (expandCollapseState === ExpandCollapseState.EXPANDED) {
            document.documentElement.style.setProperty('--sidebarWidth', '50vw')
            setWidth(window.innerWidth.toString())
          }

          return
        }

        const storedSidebarWidth = localStorage.getItem(SIDEBAR_WIDTH_KEY)
        if (!storedSidebarWidth || storedSidebarWidth === 'undefined') {
          return
        }

        document.documentElement.style.setProperty('--sidebarWidth', `${storedSidebarWidth}px`)
      }, 250)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [expandCollapseState])

  useEffect(() => {
    const sidebar = document.querySelector(`.${styles.sidebar}`) as HTMLElement
    if (!width) {
      return
    }

    setTimeout(() => {
      localStorage.setItem(SIDEBAR_WIDTH_KEY, width)
      sidebar.style.transition = 'var(--expandCollapseTransition)'
    }, 250)
  }, [width])

  useEffect(() => {
    if (!isResizing) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) {
        return
      }

      const sidebar = document.querySelector(`.${styles.sidebar}`) as HTMLElement
      const newWidth = e.pageX - sidebar.offsetLeft
      const minWidth = 250
      const maxWidth = Math.max(window.innerWidth * 0.35, 500)
      const updatedWidth = Math.min(Math.max(newWidth, minWidth), maxWidth)

      document.documentElement.style.setProperty('--sidebarWidth', `${updatedWidth}px`)
      setWidth(updatedWidth.toString())
      sidebar.style.transition = 'none'
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  const handleMouseDown = () => setIsResizing(true)

  const handleMouseUp = () => setIsResizing(false)

  return (
    <aside className={`${styles.sidebar} ${styles[expandCollapseState]}`}>
      <button className={styles.resizer} onMouseDown={handleMouseDown}></button>
      <Toggler />
      <Nav />
      <Links />
    </aside>
  )
}
