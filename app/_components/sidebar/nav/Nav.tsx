import { useEffect, useMemo, useState } from 'react';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import useMedia from 'use-media';

import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';

import styles from './Nav.module.scss';

interface NavItem {
  path: string;
  label: string;
}

export default function Nav() {
  const currentPath = usePathname();
  const isMobile = useMedia({ maxWidth: 768 });
  const { toggleExpandCollapseState } = useExpandCollapseContext();

  const [activePaths, setActivePaths] = useState<string[]>([]);

  const items: NavItem[] = useMemo(
    () => [
      { path: '/formacion', label: 'Formación' },
      { path: '/experiencia', label: 'Experiencia' },
      { path: '/proyectos', label: 'Proyectos' },
      { path: '/blog', label: 'Blog' },
      { path: '/contacto', label: 'Contacto' },
    ],
    [],
  );

  useEffect(() => {
    setActivePaths(
      items.map((item) =>
        currentPath.startsWith(item.path) ? styles.active : '',
      ),
    );
  }, [currentPath, items]);

  const handleLinkClick = () => {
    if (isMobile) {
      toggleExpandCollapseState();
    }
  };

  return (
    <nav className={styles.nav}>
      {items.map((item, index) => (
        <Link
          key={item.path}
          href={item.path}
          onClick={handleLinkClick}
          className={activePaths[index]}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
