'use client';

import { useCallback, useEffect, useState } from 'react';

import { ExpandCollapseState, useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';

import Nav from './nav/Nav';
import SidebarToggle from './toggler/SidebarToggle';
import Links from './links/Links';
import styles from './Sidebar.module.scss';

const SIDEBAR_WIDTH_KEY = 'sidebar_width';

export default function Sidebar() {
  const { expandCollapseState, setSidebarWidth } = useExpandCollapseContext();

  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState('');

  const handleMouseDown = useCallback(() => setIsResizing(true), []);
  const handleMouseUp = useCallback(() => setIsResizing(false), []);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth < 768) {
          if (expandCollapseState === ExpandCollapseState.EXPANDED) {
            const sidebarWidth = windowWidth < 366 ? '100vw' : '70vw';
            document.documentElement.style.setProperty(
              '--sidebarWidth',
              sidebarWidth,
            );
            setWidth(windowWidth.toString());
            setSidebarWidth(
              windowWidth < 366 ? windowWidth : windowWidth * 0.56,
            );
          }
          return;
        }

        const storedSidebarWidth = localStorage.getItem(SIDEBAR_WIDTH_KEY);
        if (!storedSidebarWidth || storedSidebarWidth === 'undefined') {
          return;
        }

        const sidebarWidth = parseInt(storedSidebarWidth, 10);
        setSidebarWidth(sidebarWidth);
        document.documentElement.style.setProperty(
          '--sidebarWidth',
          `${sidebarWidth}px`,
        );
      }, 250);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [expandCollapseState, setSidebarWidth]);

  useEffect(() => {
    const sidebar = document.querySelector(`.${styles.sidebar}`) as HTMLElement;
    if (!width) {
      return;
    }

    setTimeout(() => {
      localStorage.setItem(SIDEBAR_WIDTH_KEY, width);
      sidebar.style.transition = 'var(--expandCollapseTransition)';
    }, 250);
  }, [width]);

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
      setWidth(resizedSidebarWidth.toString());
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
      <button
        className={styles.resizer}
        type="button"
        onClick={handleMouseDown}
      />
      <SidebarToggle />
      <Nav />
      <Links />
    </aside>
  );
}