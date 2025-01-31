import { useEffect, useMemo, useState } from 'react';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';
import useMedia from 'use-media';

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
      { path: '/formation', label: 'Formación' },
      { path: '/experience', label: 'Experiencia' },
      { path: '/projects', label: 'Proyectos' },
      // { path: '/blog', label: 'Blog' }, // TODO activate blog once an official article has been written
      { path: '/contact', label: 'Contacto' },
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
