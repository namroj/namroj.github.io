'use client';

import { Link } from 'next-view-transitions';

import {
  ExpandCollapseState,
  useExpandCollapseContext,
} from '@/providers/expand-collapse/ExpandCollapseProvider';
import ThemeToggle from '@/components/theme/ThemeToggle';

import { FaRegCopyright } from 'react-icons/fa';
import styles from './Footer.module.scss';

export default function Footer() {
  const { expandCollapseState } = useExpandCollapseContext();

  const getCollapsedOrExpandedState = () =>
    expandCollapseState === ExpandCollapseState.COLLAPSED
      ? ExpandCollapseState.EXPANDED
      : ExpandCollapseState.COLLAPSED;

  return (
    <footer
      className={`${styles.footer} 
      ${styles[getCollapsedOrExpandedState()]}`}
    >
      <ThemeToggle />
      <span>
        <FaRegCopyright /> <Link href="/">Jorman Espinoza</Link>
      </span>
    </footer>
  );
}
