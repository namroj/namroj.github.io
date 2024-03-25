import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useExpandCollapseContext } from '@/app/_context-providers/expand-collapse/ExpandCollapseProvider'
import useMedia from 'use-media'

import styles from './Nav.module.scss'

interface NavItem {
  path: string
  label: string
}

export default function Nav() {
  const currentPath = usePathname()
  const { toggleExpandCollapseState } = useExpandCollapseContext()
  const isMobile = useMedia({ maxWidth: '768px' })

  const setActivePathClass = (path: string) => (currentPath.startsWith(path) ? styles.active : '')

  const handleLinkClick = () => {
    if (isMobile) toggleExpandCollapseState()
  }

  const items: NavItem[] = [
    { path: '/formacion', label: 'Formación' },
    { path: '/experiencia', label: 'Experiencia' },
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/tipografias', label: 'Tipografías' },
    { path: '/blog', label: 'Blog' },
    { path: '/contacto', label: 'Contacto' }
  ]

  return (
    <nav className={styles.nav}>
      {items.map((item, index) => (
        <Link className={setActivePathClass(item.path)} href={item.path} onClick={handleLinkClick} key={index}>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
