import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider'
import useMedia from 'use-media'
import styles from './Nav.module.scss'
import { useEffect, useState } from 'react'

interface NavItem {
  path: string
  label: string
}

export default function Nav() {
  const currentPath = usePathname()
  const { toggleExpandCollapseState } = useExpandCollapseContext()
  const isMobile = useMedia({ maxWidth: '768px' })

  const [activePaths, setActivePaths] = useState<string[]>([])

  useEffect(() => {
    setActivePaths(items.map((item) => (currentPath.startsWith(item.path) ? styles.active : '')))
  }, [currentPath])

  const handleLinkClick = () => {
    if (isMobile) {
      toggleExpandCollapseState()
    }
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
        <Link key={item.path} href={item.path} onClick={handleLinkClick} className={activePaths[index]}>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
