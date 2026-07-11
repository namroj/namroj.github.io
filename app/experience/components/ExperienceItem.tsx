import React from 'react';
import Image from 'next/image';
import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';
import TagButton from '@/components/ui/tag/btn/TagButton';
import { useLanguage } from '@/providers/language/LanguageProvider';
import styles from './ExperienceItem.module.scss';

export type ExperienceItemType = {
  entity: { name: string; image: string; url: string };
  location: { es: string; en: string };
  interval: { es: string; en: string };
  positions: {
    title: { es: string; en: string };
    description: { es: string; en: string };
    highlight: { es: string; en: string };
    interval: { es: string; en: string };
  }[];
  tags: string[];
};

const COMPONENT_MIN_WIDTH = 400;

type Props = {
  item: ExperienceItemType;
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
  highlightText: (text: string) => React.ReactNode;
};

export function ExperienceItem({
                                 item,
                                 selectedTags,
                                 handleTagClick,
                                 highlightText,
                               }: Props) {
  const { mainWidth } = useExpandCollapseContext();
  const { language } = useLanguage();

  return (
    <li className={styles.item}>
      <article
        className={`${mainWidth < COMPONENT_MIN_WIDTH ? styles.mainReduced : ''}`}
      >
        <div className={styles.entity}>
          <a href={item.entity.url} target="_blank" rel="noreferrer">
            <Image
              src={item.entity.image}
              alt={item.entity.name}
              width={100}
              height={100}
            />
          </a>

          <div className={styles.content}>
            <h3>
              <a href={item.entity.url} target="_blank" rel="noreferrer">
                {highlightText(item.entity.name)}
              </a>
            </h3>
            <p className={styles.location}>
              <span>[{highlightText(item.location[language])}]</span>
            </p>
            <p className={styles.date}>{highlightText(item.interval[language])}</p>
          </div>

        </div>

        <div className={styles.timeline}>
          {item.positions.map((position) => (
            <div key={position.title[language]} className={styles.item}>
              <div className={styles.circle} />
              <div className={styles.line} />
              <div className={styles.position}>
                <h4>{highlightText(position.title[language])}</h4>
                <p>{highlightText(position.interval[language])}</p>
                <p className={styles.description}>
                  {(() => {
                    const description = position.description[language];
                    const descriptionItems = description.split('||');
                    return descriptionItems.length > 1
                      ? descriptionItems.map((desc) => (
                        <li key={desc}>{highlightText(desc)}</li>
                      ))
                      : highlightText(description);
                  })()}
                </p>
                <p className={styles['highlight-text']}>
                  {highlightText(position.highlight[language])}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tags}>
          <ul>
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
      </article>
    </li>
  );
}
