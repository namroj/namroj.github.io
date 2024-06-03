'use client'

import { motion } from 'framer-motion'

import {
  Theme,
  ThemeLabel,
  useThemeContext
} from '@/providers/theme/ThemeProvider'

import { RiMacbookLine } from 'react-icons/ri'
import { BsSun } from 'react-icons/bs'
import { HiMoon } from 'react-icons/hi'
import styles from './Toggler.module.scss'

export default function ToggleTheme() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <>
      <button key={Theme.AUTO} className={styles.toggler}>
        <motion.div
          className={`${styles.btn} ${theme === Theme.AUTO && styles.active}`}
        >
          <RiMacbookLine
            onClick={() => toggleTheme(Theme.AUTO)}
            title={ThemeLabel.AUTO}
          />
        </motion.div>
      </button>

      <button key={Theme.LIGHT} className={styles.toggler}>
        <motion.div
          className={`${styles.btn} ${theme === Theme.LIGHT && styles.active}`}
        >
          <BsSun
            onClick={() => toggleTheme(Theme.LIGHT)}
            title={ThemeLabel.LIGHT}
          />
        </motion.div>
      </button>

      <button key={Theme.DARK} className={styles.toggler}>
        <motion.div
          className={`${styles.btn} ${theme === Theme.DARK && styles.active}`}
        >
          <HiMoon
            onClick={() => toggleTheme(Theme.DARK)}
            title={ThemeLabel.DARK}
          />
        </motion.div>
      </button>
    </>
  )
}
