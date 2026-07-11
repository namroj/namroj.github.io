'use client';

import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { useLanguage } from '@/providers/language/LanguageProvider';
import Links from '@/components/sidebar/links/Links';
import Skills from '@/components/skills/Skills';
import Tools from '@/components/tools/Tools';
import Typographies from '@/components/typographies/Typographies';
import heroImage from '@/assets/images/hero.jpg';
import { ImBooks } from 'react-icons/im';
import { FaCode, FaKeyboard } from 'react-icons/fa6';
import { MdLaptop } from 'react-icons/md';
import styles from './page.module.scss';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <div className={styles.dev}>
        <h2>Jorman Espinoza</h2>
        <h3>{t('home.role')}</h3>
      </div>

      <div className={styles.hero}>
        <Image
          src={heroImage}
          alt="Jorman Espinoza"
          width={1600}
          height={1000}
          className={styles.image}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={styles.links}>
          <Link href="/experience/" title={t('nav.experience')}>
            <MdLaptop />
          </Link>
          <Link href="/formation/" title={t('nav.formation')}>
            <ImBooks />
          </Link>
          <Link href="/projects/" title={t('nav.projects')}>
            <FaCode />
          </Link>
          <Link href="/blog/" title={t('nav.blog')}>
            <FaKeyboard />
          </Link>
        </div>
      </div>

      <Links />

      <div className={styles.intro}>
        {t('home.description')}
        <ul>
          <li key="li-1">{t('home.bullet1')}</li>
          <li key="li-2">{t('home.bullet2')}</li>
        </ul>
      </div>

      <hr className={styles.divider} />

      <section className={styles.skills}>
        <h4 className={styles.title}>{t('home.arsenal')}</h4>
        <Skills />
      </section>

      <hr className={styles.divider} />

      <section>
        <h4 className={styles.title}>{t('home.tools')}</h4>
        <Tools />
      </section>

      <hr className={styles.divider} />

      <section>
        <h4 className={styles.title}>{t('home.projects_title')}</h4>
        {t('home.projects_text').split('{link}')[0]}
        <Link href="/projects/">{t('nav.projects').toLowerCase()}</Link>
        {t('home.projects_text').split('{link}')[1]}
      </section>

      <hr className={styles.divider} />

      <section>
        <h4 className={styles.title}>{t('home.formation_title')}</h4>
        {t('home.formation_text').split('{link}')[0]}
        <Link href="/formation/">{t('nav.formation').toLowerCase()}</Link>
        {t('home.formation_text').split('{link}')[1]}
      </section>

      <hr className={styles.divider} />

      <section>
        <h4 className={styles.title}>{t('home.fonts_title')}</h4>
        <Typographies />
      </section>

      <hr className={styles.divider} />

      <p className={styles.location}>
        {t('home.path_text').split('{link}')[0]}
        <Link href="/location/">Argentina</Link>
        {t('home.path_text').split('{link}')[1]}
      </p>
    </>
  );
}
