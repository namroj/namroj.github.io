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

  const updateSidebarWidth = useCallback(() => {
    if (sidebarRef.current) {
      setSidebarWidth(sidebarRef.current.getBoundingClientRect().width);
    }
  }, [expandCollapseState]);

  const updateMainWidth = useCallback(() => {
    const windowWidth = window.innerWidth;
    const mainWidth =
      expandCollapseState === ExpandCollapseState.EXPANDED &&
      windowWidth >= 1024
        ? windowWidth - sidebarWidth
        : windowWidth;

    setMainWidth(mainWidth);
  }, [expandCollapseState]);

  useEffect(() => {
    updateSidebarWidth();
    updateMainWidth();

    const handleResize = () => {
      updateMainWidth();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateSidebarWidth, updateMainWidth]);

  return (
    <aside
      ref={sidebarRef}
      className={`${styles.sidebar} ${styles[expandCollapseState]}`}
    >
      <Header />
      <SidebarToggle />
      <Nav />
      <Links />
    </aside>
  );
}
