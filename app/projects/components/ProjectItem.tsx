'use client';

import { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';
import TagButton from '@/components/ui/tag/btn/TagButton';
import styles from './ProjectItem.module.scss';

export type ProjectItemType = {
  name: string;
  summary: string;
  description: string;
  url?: string;
  repository?: string;
  logo: string;
  tags: string[];
  dark: boolean;
}

type Props = {
  item: ProjectItemType;
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
  highlightText: (text: string) => JSX.Element;
};

const LOG_SIZE = 89;
const COMPONENT_MIN_WIDTH = 400;

export default function ProjectItem({
                                      item,
                                      selectedTags,
                                      handleTagClick,
                                      highlightText,
                                    }: Props) {
  const { mainWidth } = useExpandCollapseContext();
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => setShowMore((prevState) => !prevState);

  return (
    <li
      key={item.name}
      className={`${styles.item} ${mainWidth < COMPONENT_MIN_WIDTH ? styles['main-reduced'] : ''}`}
    >
      <div className={styles.identity}>
        {item.logo && (
          <Image
            src={item.logo}
            alt={item.name}
            width={LOG_SIZE}
            height={LOG_SIZE}
            className={classNames(styles.logo, {
              [styles.dark]: item.dark,
            })}
          />
        )}

        <div className={styles.title}>
          <h3>{highlightText(item.name)}</h3>
          <p className={styles.summary}>
            {highlightText(item.summary)}
          </p>
        </div>
      </div>

      {item.tags.length > 0 && (
        <div className={styles.tags}>
          <ul className={styles.tags}>
            {item.tags.map((tag) => (
              <li key={`li-${tag}`}>
                <TagButton
                  tag={tag}
                  handleTagClick={handleTagClick}
                  selectedTags={selectedTags}
                  highlightText={highlightText}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.description && (
        <button
          type="button"
          onClick={toggleShowMore}
          aria-pressed={showMore}
          className={styles.more}
        >
          {showMore ? 'Ver menos' : 'Ver más'}
        </button>
      )}

      <div
        className={
          classNames(styles.description, { [styles.visible]: showMore })
        }
      >
        {highlightText(item.description)}
      </div>


      <div className={styles.links}>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className={styles.url}
          >
            Sitio web
          </a>
        )}

        {item.repository && (
          <a
            href={item.repository}
            target="_blank"
            rel="noreferrer"
            className={styles.url}
          >
            Repositorio
          </a>
        )}
      </div>
    </li>
  );
}