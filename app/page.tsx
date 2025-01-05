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

interface Typography {
  name: string;
  author: {
    name: string;
    url: string;
  };
  url: string;
}

// TODO extract typographies to its own component
const typographies: Typography[] = [
  {
    name: 'Dank Mono',
    url: 'https://philpl.gumroad.com/l/dank-mono',
    author: {
      name: 'Phil Pluckthun',
      url: 'https://philpl.gumroad.com',
    },
  },
  {
    name: 'JetBrains Mono',
    url: 'https://www.jetbrains.com/es-es/lp/mono',
    author: {
      name: 'JetBrains',
      url: 'https://www.jetbrains.com',
    },
  },
  {
    name: 'Cascadia Code',
    url: 'https://learn.microsoft.com/es-es/windows/terminal/cascadia-code#cascadia-code-versions',
    author: {
      name: 'Microsoft',
      url: 'https://www.microsoft.com/es-ar',
    },
  },
  {
    name: 'Fira Code',
    url: 'https://github.com/tonsky/FiraCode/blob/master/LEEME.md',
    author: {
      name: 'Nikita Prokopov [tonsky]',
      url: 'https://github.com/tonsky',
    },
  },
];

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
          <Link href="/experience" title="Experiencia"><MdLaptop /></Link>
          <Link href="/formation" title="Formación"><ImBooks /></Link>
          <Link href="/projects" title="Proyectos"><FaCode /></Link>
          <Link href="/blog" title="Blog"><FaKeyboard /></Link>
        </div>
      </div>

      <Links />

      <div className={styles.intro}>
        Profesional en desarrollo de software desde 2015.
        <br />
        Apasionado por las buenas prácticas, el código limpio y los patrones de diseño.
        <ul>
          <li key="li-1">Diseño y desarrollo desde páginas web hasta tiendas en línea.</li>
          <li key="li-2">Trabajo de manera efectiva en equipos de tecnología.</li>
        </ul>
      </div>

      <hr className={styles.divider} />

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
        <ul>
          {typographies.map(typo => (
            <li key={typo.name}>
              <a
                href={typo.url}
                target="_blank"
                rel="noreferrer"
              >
                {typo.name}
              </a>{' '}
              - por{' '}
              <a
                href={typo.author.url}
                target="_blank"
                rel="noreferrer"
              >
                {typo.author.name}
              </a>
              .
            </li>
          ))}

        </ul>
      </section>

      <hr className={styles.divider} />

      <p style={{ textAlign: 'right' }}>
        -- Mi camino de Venezuela a <Link href="/location">Argentina</Link>.
      </p>
    </>
  );
}
