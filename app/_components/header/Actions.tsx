'use client';

import GlobalSearch from '@/components/ui/search/GlobalSearch';
import ThemeToggle from '@/components/theme/ThemeToggle';
import LanguageSwitcher from '@/components/ui/language/LanguageSwitcher';
import styles from './Actions.module.scss';

export default function Actions() {
  return (
    <div className={styles.actions}>
      <GlobalSearch />
      <ThemeToggle />
      <LanguageSwitcher />
    </div>
  );
}
