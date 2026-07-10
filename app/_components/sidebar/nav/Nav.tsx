import { useEffect, useMemo, useState } from 'react';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';
import { useLanguage } from '@/providers/language/LanguageProvider';

import styles from './Nav.module.scss';


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
  const { t } = useLanguage();

  const items: NavItem[] = useMemo(
    () => [
      { path: '/formation/', label: t('nav.formation') },
      { path: '/experience/', label: t('nav.experience') },
      { path: '/projects/', label: t('nav.projects') },
      { path: '/blog/', label: t('nav.blog') },
      { path: '/contact/', label: t('nav.contact') },
    ],
    [t],
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
