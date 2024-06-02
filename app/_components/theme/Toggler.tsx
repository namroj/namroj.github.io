'use client'

import { motion } from 'framer-motion'

import { Theme, useThemeContext } from '@/providers/theme/ThemeProvider'

import { TOGGLE_FRAMER_CONFIG, TOGGLE_SVG_FRAMER_CONFIG } from './config'

import { RiDeviceLine, RiSunFoggyLine, RiMoonFoggyFill } from 'react-icons/ri'
import styles from './Toggler.module.scss'

export default function ToggleTheme() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <>
      <button key={Theme.AUTO} className={styles.toggler}>
        <motion.div
          className={`${styles.btn} ${theme === Theme.AUTO && styles.active}`}
          {...TOGGLE_FRAMER_CONFIG}
        >
          <RiDeviceLine
            onClick={() => toggleTheme(Theme.AUTO)}
            {...TOGGLE_SVG_FRAMER_CONFIG}
          />
        </motion.div>
      </button>

      <button key={Theme.LIGHT} className={styles.toggler}>
        <motion.div
          className={`${styles.btn} ${theme === Theme.LIGHT && styles.active}`}
          {...TOGGLE_FRAMER_CONFIG}
        >
          <RiSunFoggyLine onClick={() => toggleTheme(Theme.LIGHT)} />
        </motion.div>
      </button>

      <button key={Theme.DARK} className={styles.toggler}>
        <motion.div
          className={`${styles.btn} ${theme === Theme.DARK && styles.active}`}
          {...TOGGLE_FRAMER_CONFIG}
        >
          <RiMoonFoggyFill onClick={() => toggleTheme(Theme.DARK)} />
        </motion.div>
      </button>
    </>
  )
}
