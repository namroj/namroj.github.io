import Skills from '@/components/skills/Skills';
import Tools from '@/components/tools/Tools';
import styles from './page.module.scss';
import { Link } from 'next-view-transitions';

export default function HomePage() {
  return (
    <>
      <h2 className={styles.profession}>Jorman Espinoza - Desarrollador Full Stack</h2>
      <br />
      Desarrollando profesionalmente desde 2015.
      <br />
      Amante de las buenas prácticas, el código limpio y los patrones de diseño.
      <p>Desde páginas web hasta tiendas virtuales.</p>

      <section>
        <h4 className={styles.title}>Servicios</h4>
        <ul>
          <li>Maquetación</li>
          <li>Firmas de correo personalizadas HTML</li>
          <li>
            Desarrollo de páginas web
            <ul>
              <li>Estáticas</li>
              <li>Auto administrables</li>
            </ul>
          </li>
          <li>Desarrollo de tiendas virtuales</li>
          <li>Desarrollo y mantenimiento de APIs</li>
          <li>Gestión y mantenimiento de bases de datos</li>
          <li>Generación y personalización de sitios en WordPress</li>
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
        <Link href="/projects">Ver listado</Link>
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
          </li>
        </ul>
      </section>
    </>
  );
}
