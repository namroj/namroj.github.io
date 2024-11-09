import Image from 'next/image';

import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';
import TagButton from '@/components/ui/tag/TagButton';

import { TbExternalLink } from 'react-icons/tb';
import styles from './FormationItem.module.scss';

export type FormationItemType = {
  title: string;
  entity: { name: string; image: string; url: string };
  location: string;
  interval: string;
  description: string;
  tags: string[];
  certificate?: string;
};

const COMPONENT_MIN_WIDTH = 400;

type Props = {
  item: FormationItemType;
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
  highlightText: (text: string) => JSX.Element;
};

export function FormationItem({
                                item,
                                selectedTags,
                                handleTagClick,
                                highlightText,
                              }: Props) {
  const { mainWidth } = useExpandCollapseContext();

  return (
    <li className={styles.item}>
      <article
        className={`${mainWidth < COMPONENT_MIN_WIDTH ? styles['main-reduced'] : ''}`}
      >
        <p className={styles.date}>{highlightText(item.interval)}</p>
        <div className={styles.data}>
          <a href={item.entity.url} target="_blank" rel="noreferrer">
            <Image
              src={item.entity.image}
              alt={item.entity.name}
              width={100}
              height={100}
            />
          </a>

          <div className={styles.content}>
            <h3 className={styles.title}>{highlightText(item.title)}</h3>
            <div className={styles.entity}>
              <h4>
                <a href={item.entity.url} target="_blank" rel="noreferrer">
                  {highlightText(item.entity.name)}
                </a>
              </h4>
              <p>[{highlightText(item.location)}]</p>
            </div>
          </div>
        </div>

        <p className={styles.description}>{highlightText(item.description)}</p>

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
          {item.certificate && (
            <code className={styles.certificate}>
              <a href={item.certificate} target="_blank" rel="noreferrer">
                <TbExternalLink /> Certificado
              </a>
            </code>
          )}
        </div>
      </article>
    </li>
  );
}
