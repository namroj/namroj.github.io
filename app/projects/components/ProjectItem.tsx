'use client';

import { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';
import TagButton from '@/components/ui/tag/btn/TagButton';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { TbExternalLink } from 'react-icons/tb';
import styles from './ProjectItem.module.scss';

export type ProjectItemType = {
  name: string;
  summary: string;
  description: string;
  url?: string;
  repository?: string;
  logo: string;
  tags: string[];
  bg_color: string;
  year: number;
}

type Props = {
  item: ProjectItemType;
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
  highlightText: (text: string) => JSX.Element;
};

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
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logo}
            style={{ backgroundColor: item.bg_color }}
          >
            <div className={styles.wrapper}>
              <Image
                src={item.logo}
                alt={item.name}
                layout="fill"
                className={styles.image}
              />
            </div>
          </a>
        )}

        <div>
          <h3 className={styles.title}>{highlightText(item.name)}</h3>
          <p className={styles.summary}>
            {highlightText(item.summary)}
          </p>
        </div>
      </div>

      <span className={styles.year}>[{item.year}]</span>

      <div className={styles.extra}>
        {item.description && (
          <button
            type="button"
            onClick={toggleShowMore}
            aria-pressed={showMore}
            className={styles.more}
            title={showMore ? 'Ver menos' : 'Ver más'}
          >
            {showMore ? <CiCircleMinus /> : <CiCirclePlus />}
          </button>
        )}

        {item.tags.length > 0 && (
          <div className={styles.tags}>
            <ul className={styles.tags}>
              {item.tags.map((tag) => (
                <li key={tag}>
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

        <div className={styles.links}>
          {item.repository && (
            <a
              href={item.repository}
              target="_blank"
              rel="noreferrer"
              className={styles.url}
            >
              <TbExternalLink /> Repositorio
            </a>
          )}
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={styles.url}
            >
              <TbExternalLink /> Sitio web
            </a>
          )}
        </div>
      </div>

      <div
        className={
          classNames(styles.description, { [styles.visible]: showMore })
        }
      >
        {highlightText(item.description)}
      </div>
    </li>
  );
}