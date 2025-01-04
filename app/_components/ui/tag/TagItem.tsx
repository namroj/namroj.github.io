import { ReactNode } from 'react';
import styles from '@/components/ui/tag/TagItem.module.scss';

export interface Tag {
  name: string;
  url: string;
  icon: ReactNode;
}

export default function TagItem({ item }: Readonly<{ item: Tag }>) {
  return (
    <li key={item.name} className={styles.item}>
      <a href={item.url} target="_blank" rel="noreferrer">
        <span>{item.icon}</span>
        <span>{item.name}</span>
      </a>
    </li>
  );
}