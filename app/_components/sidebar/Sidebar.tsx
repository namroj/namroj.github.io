'use client';

import { useEffect, useState } from 'react';
import {
  ExpandCollapseState,
  useExpandCollapseContext,
} from '@/providers/expand-collapse/ExpandCollapseProvider';
import Header from '@/components/header/Header';
import Nav from './nav/Nav';
import SidebarToggle from '@/components/sidebar/toggle/SidebarToggle';
import Links from './links/Links';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  const { expandCollapseState, setMainWidth, sidebarWidth, setSidebarWidth } =
    useExpandCollapseContext();

  const detectSidebarWidth = () => {
    const sidebar = document.querySelector(`.${styles.sidebar}`) as HTMLElement;
    if (sidebar) {
      const sidebarWidth = sidebar.getBoundingClientRect().width;
      setSidebarWidth(sidebarWidth);
    }
  };

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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [expandCollapseState]);

  useEffect(() => {
    detectSidebarWidth();
  }, [expandCollapseState]);

  return (
    <aside className={`${styles.sidebar} ${styles[expandCollapseState]}`}>
      <Header />
      <SidebarToggle />
      <Nav />
      <Links />
    </aside>
  );
}
