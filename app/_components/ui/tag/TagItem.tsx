import React from 'react';
import tagStyles from '@/components/ui/tag/TagItem.module.scss';

export interface Tag {
  name: string;
  icon: React.ReactNode;
  url: string;
}

interface TagItemProps {
  item: Tag;
}

export default function TagItem({ item }: Readonly<TagItemProps>) {
  return (
    <li key={item.name} className={tagStyles.item}>
      <a href={item.url} target="_blank" rel="noreferrer">
        <span>{item.icon}</span>
        <span>{item.name}</span>
      </a>
    </li>
  );
}