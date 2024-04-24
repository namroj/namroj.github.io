'use client'

import { Link } from 'next-view-transitions'
import Image from 'next/image'

import {
  ExpandCollapseState,
  useExpandCollapseContext
} from '@/providers/expand-collapse/ExpandCollapseProvider'

import nextJsLogo from '@/assets/icons/next.svg'
import styles from './Footer.module.scss'

export default function Footer() {
  const { expandCollapseState } = useExpandCollapseContext()

  const getCollapsedOrExpandedState = () =>
    expandCollapseState === ExpandCollapseState.COLLAPSED ? ExpandCollapseState.EXPANDED : ExpandCollapseState.COLLAPSED

  return (
    <footer className={`${styles.footer} ${styles[getCollapsedOrExpandedState()]}`}>
      <span>
        por <Link href='/'>Jorman</Link> mediante{' '}
      </span>
      <a href='https://nextjs.org/' target='_blank'>
        <Image src={nextJsLogo} alt='Next.js' width={20} height={20} />
      </a>
    </footer>
  )
}
