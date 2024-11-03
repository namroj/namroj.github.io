'use client';

import { Link } from 'next-view-transitions';
import { useNavigationContext } from '@/providers/navigation/NavigationProvider';
import styles from './Breadcrumbs.module.scss';

export default function Breadcrumbs() {
  const { breadcrumbs } = useNavigationContext();

  return (
    <div className={styles.breadcrumbs}>
      {breadcrumbs.map((item, index) => (
        <div key={item.label} className={styles.item}>
          {item.href ? (
            <Link href={item.href} className={styles.linked}>
              <span>{item.label}</span>
            </Link>
          ) : (
            <span className={styles.current}>
              <span>{item.label}</span>
            </span>
          )}
          {index < breadcrumbs.length - 1 && (
            <span className={styles.connector}>{'>'}</span>
          )}
        </div>
      ))}
    </div>
  );
}
