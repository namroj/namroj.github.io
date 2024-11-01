'use client';

import { useCallback, useEffect, useState } from 'react';

import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';

import Header from '@/components/header/Header';
import Nav from './nav/Nav';
import SidebarToggle from './toggler/SidebarToggle';
import Links from './links/Links';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  const { expandCollapseState, setSidebarWidth } = useExpandCollapseContext();

  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback(() => setIsResizing(true), []);
  const handleMouseUp = useCallback(() => setIsResizing(false), []);

  useEffect(() => {
    if (!isResizing) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) {
        return;
      }

      const sidebar = document.querySelector(
        `.${styles.sidebar}`,
      ) as HTMLElement;
      const newWidth = e.pageX - sidebar.offsetLeft;
      const minWidth = 230;
      const maxWidth = Math.max(window.innerWidth * 0.5, 500);
      const resizedSidebarWidth = Math.min(
        Math.max(newWidth, minWidth),
        maxWidth,
      );

      document.documentElement.style.setProperty(
        '--sidebarWidth',
        `${resizedSidebarWidth}px`,
      );
      setSidebarWidth(resizedSidebarWidth);
      sidebar.style.transition = 'none';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseUp, setSidebarWidth]);

  return (
    <aside className={`${styles.sidebar} ${styles[expandCollapseState]}`}>
      <Header />
      <SidebarToggle />
      <Nav />
      <Links />
    </aside>
  );
}