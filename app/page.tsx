import Image from 'next/image';
import { Link } from 'next-view-transitions';

import Links from '@/components/sidebar/links/Links';
import Skills from '@/components/skills/Skills';
import Tools from '@/components/tools/Tools';

import heroImage from '@/assets/images/hero.jpg';
import { ImBooks } from 'react-icons/im';
import { FaCode, FaKeyboard } from 'react-icons/fa6';
import { MdLaptop } from 'react-icons/md';
import styles from './page.module.scss';

export default function HomePage() {
  return (
    <>
      <div className={styles.jorman}>
        <h2>Jorman Espinoza</h2>
        <h3>Desarrollador Full Stack</h3>
      </div>

      <div className={styles.hero}>
        <Image
          src={heroImage}
          alt="Jorman Espinoza"
          layout="responsive"
          width={16}
          height={10}
          className={styles.image}
        />
        <div className={styles.links}>
          <Link href="/experience" title="Experiencia"><MdLaptop /></Link>
          <Link href="/formation" title="Formación"><ImBooks /></Link>
          <Link href="/projects" title="Proyectos"><FaCode /></Link>
          <Link href="/blog" title="Blog"><FaKeyboard /></Link>
        </div>
      </div>

      <Links />

      <div className={styles.intro}>
        Desarrollo profesionalmente desde 2015.
        <br />
        Amante de las buenas prácticas, del código limpio y los patrones de diseño.
        <ul>
          <li>Realizo desde páginas web hasta tiendas virtuales.</li>
          <li>Me desenvuelvo dentro de equipos de tecnología.</li>
        </ul>
      </div>

      <section>
        <h4 className={styles.title}>Servicios</h4>
        <ul>
          <li>Maquetación.</li>
          <li>Firmas de correo personalizadas HTML.</li>
          <li>
            Desarrollo de páginas web.
            <ul>
              <li>Estáticas.</li>
              <li>Auto administrables.</li>
            </ul>
          </li>
          <li>Desarrollo de tiendas virtuales.</li>
          <li>Desarrollo y mantenimiento de APIs.</li>
          <li>Gestión y mantenimiento de bases de datos.</li>
          <li>Generación y personalización de sitios en WordPress.</li>
        </ul>
      </section>

      <section className={styles.skills}>
        <h4 className={styles.title}>Arsenal</h4>
        <Skills />
      </section>

      <section>
        <h4 className={styles.title}>Herramientas</h4>
        <Tools />
      </section>

      <section>
        <h4 className={styles.title}>Proyectos</h4>
        Algunos <Link href="/projects">proyectos</Link> que he realizado.
      </section>

      <section>
        <h4 className={styles.title}>Formación</h4>
        Acerca de mi <Link href="/formation">formación</Link>.
      </section>

      <section>
        <h4 className={styles.title}>Tipografías preferidas</h4>
        <ul>
          <li>
            <a
              href="https://philpl.gumroad.com/l/dank-mono"
              target="_blank"
              rel="noreferrer"
            >
              Dank Mono
            </a>{' '}
            - por{' '}
            <a
              href="https://philpl.gumroad.com"
              target="_blank"
              rel="noreferrer"
            >
              Phil Pluckthun
            </a>
            .
          </li>
          <li>
            <a
              href="https://www.jetbrains.com/es-es/lp/mono"
              target="_blank"
              rel="noreferrer"
            >
              JetBrains Mono
            </a>{' '}
            - por{' '}
            <a
              href="https://www.jetbrains.com/"
              target="_blank"
              rel="noreferrer"
            >
              JetBrains
            </a>
            .
          </li>
          <li>
            <a
              href="https://learn.microsoft.com/es-es/windows/terminal/cascadia-code#cascadia-code-versions"
              target="_blank"
              rel="noreferrer"
            >
              Cascadia Code
            </a>{' '}
            - por{' '}
            <a
              href="https://www.microsoft.com/es-ar"
              target="_blank"
              rel="noreferrer"
            >
              Microsoft
            </a>
            .
          </li>
          <li>
            <a
              href="https://github.com/tonsky/FiraCode/blob/master/LEEME.md"
              target="_blank"
              rel="noreferrer"
            >
              Fira Code
            </a>{' '}
            - por{' '}
            <a
              href="https://github.com/tonsky"
              target="_blank"
              rel="noreferrer"
            >
              Nikita Prokopov [tonsky]
            </a>
            .
          </li>
        </ul>
      </section>

      <p style={{ textAlign: 'right' }}>
        -- Mi <Link href="/location">camino</Link> de Venezuela a Argentina.
      </p>
    </>
  );
}
