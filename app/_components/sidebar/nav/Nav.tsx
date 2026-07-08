import { useEffect, useMemo, useState } from 'react';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';

import styles from './Nav.module.scss';

const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
};

interface NavItem {
  path: string;
  label: string;
}

export default function Nav() {
  const currentPath = usePathname();
  const [mobile, setMobile] = useState(false);
  const { toggleExpandCollapseState } = useExpandCollapseContext();

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [activePaths, setActivePaths] = useState<string[]>([]);

  const items: NavItem[] = useMemo(
    () => [
      { path: '/formation', label: 'Formación' },
      { path: '/experience', label: 'Experiencia' },
      { path: '/projects', label: 'Proyectos' },
      { path: '/blog', label: 'Blog' },
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
    if (mobile) {
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
