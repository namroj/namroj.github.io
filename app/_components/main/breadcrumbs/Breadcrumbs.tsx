'use client';

import { useEffect } from 'react';
import { Link } from 'next-view-transitions';
import {
  Breadcrumb,
  useNavigationContext,
} from '@/providers/navigation/NavigationProvider';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

export default function Breadcrumbs({ items }: Readonly<BreadcrumbsProps>) {
  const { breadcrumbs, setBreadcrumbs } = useNavigationContext();

  useEffect(() => {
    setBreadcrumbs(items);
  }, [items]);

  return (
    <div className={styles.breadcrumbs}>
      {breadcrumbs.map((item, index) => (
        <div key={item.label} className={styles.item}>
          {item.href ? (
            <Link href={item.href} className={styles.linked}>
              <>
                {item.icon} <span>{item.label}</span>
              </>
            </Link>
          ) : (
            <span className={styles.current}>
              {item.icon} <span>{item.label}</span>
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
