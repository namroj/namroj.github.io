import Link from 'next/link'
import Image from 'next/image'

import ThemeToggler from '@/app/_components/theme/toggler'

import profileImage from '@/app/_assets/images/profile.jpeg'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.id}>
        <Link href='/' className={styles['profile-image']}>
          <Image src={profileImage} alt='Jorman Espinoza - Imagen de perfil' />
        </Link>
        <div>
          <Link href='/'>
            <h1>Jorman Espinoza</h1>
          </Link>
          <div className={styles.data}>
            {'['}
            <code>
              <Link href='/'>namroj</Link>
            </code>
            {']'}
            <h2>Desarrollador Full Stack</h2>
          </div>
        </div>
      </div>
      <ThemeToggler />
    </header>
  )
}
