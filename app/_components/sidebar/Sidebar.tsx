'use client';

import { useEffect, useCallback, useRef } from 'react';
import {
  ExpandCollapseState,
  useExpandCollapseContext,
} from '@/providers/expand-collapse/ExpandCollapseProvider';
import Header from '@/components/header/Header';
import SidebarToggle from '@/components/sidebar/toggle/SidebarToggle';
import Nav from './nav/Nav';
import Links from './links/Links';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  const { expandCollapseState, setMainWidth, sidebarWidth, setSidebarWidth } =
    useExpandCollapseContext();

  const sidebarRef = useRef<HTMLElement | null>(null);

  const detectSidebarWidth = useCallback(() => {
    if (sidebarRef.current) {
      const currentSidebarWidth = sidebarRef.current.getBoundingClientRect().width;
      setSidebarWidth(currentSidebarWidth);
    }
  }, [setSidebarWidth]);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth < 1024) {
          if (expandCollapseState === ExpandCollapseState.EXPANDED) {
            setMainWidth(windowWidth - sidebarWidth);
          } else {
            setMainWidth(windowWidth);
          }

          return;
        }

        setMainWidth(windowWidth);
      }, 250);
    };

    handleResize();
    detectSidebarWidth();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [detectSidebarWidth, expandCollapseState, setMainWidth, sidebarWidth]);

  return (
    <aside ref={sidebarRef} className={`${styles.sidebar} ${styles[expandCollapseState]}`}>
      <Header />
      <SidebarToggle />
      <Nav />
      <Links />
    </aside>
  );
}