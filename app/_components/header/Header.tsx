import { Link } from 'next-view-transitions';
import Image from 'next/image';
import GlobalSearch from '@/components/ui/search/GlobalSearch';
import { useLanguage } from '@/providers/language/LanguageProvider';
import profileImage from '@/assets/images/profile.jpeg';
import styles from './Header.module.scss';

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.id}>
          <Link href="/" className={styles.image}>
            <Image
              src={profileImage} // TODO update profile image
              alt="Jorman Espinoza - Imagen de perfil"
              priority
            />
          </Link>
          <div>
            <Link href="/">
              <h1>Jorman Espinoza</h1>
            </Link>
            <div className={styles.data}>
              <span>{t('home.role')}</span>
            </div>
          </div>
        </div>
        <GlobalSearch />
      </div>
    </header>
  );
}
