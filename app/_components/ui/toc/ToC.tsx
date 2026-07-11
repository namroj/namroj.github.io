'use client';

import { useEffect, useState } from 'react';
import { Heading } from '@/utils/posts';
import { useLanguage } from '@/providers/language/LanguageProvider';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import styles from './ToC.module.scss';

interface ToCProps {
  headings: Heading[];
}

export default function ToC({ headings }: ToCProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className={`${styles.toc} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.header} onClick={() => setIsCollapsed(!isCollapsed)}>
        <h4 className={styles.title}>{t('blog.toc_title')}</h4>
        <span className={styles.toggle}>
          {isCollapsed ? <IoChevronDown /> : <IoChevronUp />}
        </span>
      </div>
      <ul className={styles.list}>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${styles.item} ${styles[`level-${heading.level}`]} ${
              activeId === heading.id ? styles.active : ''
            }`}
          >
            <a href={`#${heading.id}`} onClick={() => setIsCollapsed(true)}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
