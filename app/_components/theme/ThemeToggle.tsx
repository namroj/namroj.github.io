'use client';

import {
  Theme,
  ThemeLabel,
  useThemeContext,
} from '@/providers/theme/ThemeProvider';
import { RiMacbookLine } from 'react-icons/ri';
import { BsSun } from 'react-icons/bs';
import { HiMoon } from 'react-icons/hi';
import styles from './ThemeToggle.module.scss';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className={styles.toggle}>
      <button key={Theme.AUTO} type="button">
        <div
          className={`${styles.btn} ${theme === Theme.AUTO && styles.active}`}
        >
          <RiMacbookLine
            onClick={() => toggleTheme(Theme.AUTO)}
            title={ThemeLabel.AUTO}
          />
        </div>
      </button>

      <button key={Theme.LIGHT} type="button" className={styles.toggle}>
        <div
          className={`${styles.btn} ${theme === Theme.LIGHT && styles.active}`}
        >
          <BsSun
            onClick={() => toggleTheme(Theme.LIGHT)}
            title={ThemeLabel.LIGHT}
          />
        </div>
      </button>

      <button key={Theme.DARK} type="button" className={styles.toggle}>
        <div
          className={`${styles.btn} ${theme === Theme.DARK && styles.active}`}
        >
          <HiMoon
            onClick={() => toggleTheme(Theme.DARK)}
            title={ThemeLabel.DARK}
          />
        </div>
      </button>
    </div>
  );
}
