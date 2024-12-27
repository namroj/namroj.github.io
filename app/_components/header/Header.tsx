import { Link } from 'next-view-transitions';
import Image from 'next/image';
import profileImage from '@/assets/images/profile.jpeg';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.id}>
        <Link href="/" className={styles.image}>
          <Image
            src={profileImage}
            alt="Jorman Espinoza - Imagen de perfil"
            priority
          />
        </Link>
        <div>
          <Link href="/">
            <h1>Jorman Espinoza</h1>
          </Link>
          <div className={styles.data}>
            <span>Desarrollador Full Stack</span>
          </div>
        </div>
      </div>
    </header>
  );
}
