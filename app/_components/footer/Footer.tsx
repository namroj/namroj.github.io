'use client';

import { Link } from 'next-view-transitions';
import {
  ExpandCollapseState,
  useExpandCollapseContext,
} from '@/providers/expand-collapse/ExpandCollapseProvider';
import ThemeToggle from '@/components/theme/ThemeToggle';
import LanguageSwitcher from '@/components/ui/language/LanguageSwitcher';
import Breadcrumbs from '@/components/footer/breadcrumbs/Breadcrumbs';
import { useLanguage } from '@/providers/language/LanguageProvider';
import { FaRegCopyright } from 'react-icons/fa';
import styles from './Footer.module.scss';

export default function Footer() {
  const { expandCollapseState } = useExpandCollapseContext();
  const { t } = useLanguage();

  const getCollapsedOrExpandedState = () =>
    expandCollapseState === ExpandCollapseState.COLLAPSED
      ? ExpandCollapseState.EXPANDED
      : ExpandCollapseState.COLLAPSED;

  return (
    <footer
      className={`${styles.footer} 
      ${styles[getCollapsedOrExpandedState()]}`}
    >
      <Breadcrumbs />

      <div className={styles.content}>
        <div className={styles.controls}>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
        <span>
          <FaRegCopyright /> {t('common.by')} <Link href="/">Jorman Espinoza</Link>
        </span>
      </div>
    </footer>
  );
}
