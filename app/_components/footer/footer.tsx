import Link from 'next/link'
import Image from 'next/image'

import nextJsLogo from '@/app/_assets/icons/next.svg'
import styles from './footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        por <Link href='/'>Jorman</Link> mediante{' '}
      </span>
      <a href='https://nextjs.org/' target='_blank'>
        <Image src={nextJsLogo} alt='Next.js' width={25} height={25} priority />
      </a>
    </footer>
  )
}
