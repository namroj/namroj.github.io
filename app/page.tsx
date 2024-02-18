import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>Jorman Espinoza</h1>
        <span>[namroj]</span>
        <h2>Full Stack Developer</h2>
      </div>

      <p>Desarrollando desde 2015</p>

      <div>
        <h3>Fuentes preferidas</h3>
        <ul>
          <li>
            <a
              href="https://philpl.gumroad.com/l/dank-mono"
              target="_blank"
            >
              Dank Mono
            </a> - by{' '}
            <a
              href="https://philpl.gumroad.com"
              target="_blank">Phil Pluckthun
            </a>
          </li>
          <li>
            <a
              href="https://www.jetbrains.com/es-es/lp/mono"
              target="_blank"
            >
              JetBrains Mono
            </a> - by{' '}
            <a href="https://www.jetbrains.com/" target="_blank">
              JetBrains
            </a>
          </li>
          <li>
            <a
              href="https://learn.microsoft.com/es-es/windows/terminal/cascadia-code#cascadia-code-versions"
              target="_blank"
            >
              Cascadia Code
            </a> - by{' '}
            <a
              href="https://www.microsoft.com/es-ar"
              target="_blank"
            >
              Microsoft
            </a>
          </li>
          <li>
            <a
              href="https://github.com/tonsky/FiraCode/blob/master/LEEME.md"
              target="_blank"
            >
              Fira Code
            </a> - by{' '}
            <a
              href="https://github.com/tonsky"
              target="_blank"
            >
              Nikita Prokopov [tonsky]
            </a>
          </li>
        </ul>
      </div>
    </main>
  )
}
