'use client';

import { useEffect, useCallback, useRef } from 'react';
import {
  ExpandCollapseState,
  useExpandCollapseContext,
} from '@/providers/expand-collapse/ExpandCollapseProvider';
import Header from '@/components/header/Header';
import SidebarToggle from '@/components/sidebar/toggle/SidebarToggle';
import Nav from './nav/Nav';
import Actions from '@/components/header/Actions';
import Links from './links/Links';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  const { expandCollapseState, setMainWidth, setSidebarWidth } =
    useExpandCollapseContext();
  const sidebarRef = useRef<HTMLElement | null>(null);

  const updateSidebarWidth = useCallback(() => {
    if (sidebarRef.current) {
      const currentWith = window.innerWidth;
      const currentSidebarWidth = sidebarRef.current.getBoundingClientRect().width;
      const mainWidth = expandCollapseState === ExpandCollapseState.EXPANDED && currentWith >= 768 ? currentWith - currentSidebarWidth : currentWith;

      setSidebarWidth(currentSidebarWidth);
      setMainWidth(mainWidth);
    }
  }, [expandCollapseState, setMainWidth, setSidebarWidth]);

  useEffect(() => {
    updateSidebarWidth();

    const handleResize = () => {
      updateSidebarWidth();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateSidebarWidth]);

  return (
    <aside
      ref={sidebarRef}
      className={`${styles.sidebar} ${styles[expandCollapseState]}`}
    >
      <Header />
      <SidebarToggle />
      <Nav />
      <Actions />
      <Links />
    </aside>
  );
}
