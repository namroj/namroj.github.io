import Image from 'next/image';
import { Link } from 'next-view-transitions';
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
  return (
    <>
      <div className={styles.dev}>
        <h2>Jorman Espinoza</h2>
        <h3>Desarrollador Full Stack</h3>
      </div>

      <div className={styles.hero}>
        <Image
          src={heroImage} // TODO update/improve hero image (maybe change it for a image/video slider)
          alt="Jorman Espinoza"
          layout="responsive"
          width={16}
          height={10}
          className={styles.image}
        />
        <div className={styles.links}>
          <Link href="/experience" title="Experiencia">
            <MdLaptop />
          </Link>
          <Link href="/formation" title="Formación">
            <ImBooks />
          </Link>
          <Link href="/projects" title="Proyectos">
            <FaCode />
          </Link>
          {/*<Link href="/blog" title="Blog"><FaKeyboard /></Link>*/}
        </div>
      </div>

      <Links />

      <div className={styles.intro}>
        <strong>Desarrollador de software desde 2015</strong>, apasionado por
        las buenas prácticas, el código limpio y los patrones de diseño.
        <ul>
          <li key="li-1">
            Diseño y desarrollo de soluciones digitales, desde sitios web hasta
            tiendas en línea.
          </li>
          <li key="li-2">
            Trabajo de forma colaborativa y efectiva en equipos de tecnología.
          </li>
        </ul>
      </div>

      <hr className={styles.divider} />

      <section className={styles.skills}>
        <h4 className={styles.title}>Arsenal</h4>
        <Skills />
      </section>

      <hr className={styles.divider} />

      <section>
        <h4 className={styles.title}>Herramientas</h4>
        <Tools />
      </section>

      <hr className={styles.divider} />

      <section>
        <h4 className={styles.title}>Proyectos</h4>
        Algunos <Link href="/projects">proyectos</Link> que he realizado.
      </section>

      <hr className={styles.divider} />

      <section>
        <h4 className={styles.title}>Formación</h4>
        Acerca de mi <Link href="/formation">formación</Link>.
      </section>

      <hr className={styles.divider} />

      <section>
        <h4 className={styles.title}>Tipografías preferidas</h4>
        <Typographies />
      </section>

      <hr className={styles.divider} />

      <p className={styles.location}>
        -- Mi camino de Venezuela a <Link href="/location">Argentina</Link>.
      </p>
    </>
  );
}
