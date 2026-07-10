'use client';

import { Language, useLanguage } from '@/providers/language/LanguageProvider';
import styles from './LanguageSwitcher.module.scss';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles.switcher}>
      <button
        type="button"
        className={`${styles.btn} ${language === Language.ES ? styles.active : ''}`}
        onClick={() => setLanguage(Language.ES)}
      >
        ES
      </button>
      <span className={styles.separator}>|</span>
      <button
        type="button"
        className={`${styles.btn} ${language === Language.EN ? styles.active : ''}`}
        onClick={() => setLanguage(Language.EN)}
      >
        EN
      </button>
    </div>
  );
}
