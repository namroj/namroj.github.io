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
  logo?: string;
  favicon?: string;
  tags: string[];
  dark: boolean;
}

type Props = {
  item: ProjectItemType;
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
  highlightText: (text: string) => JSX.Element;
};

const FAVICON_SIZE = 20;
const COMPONENT_MIN_WIDTH = 400;

export default function ProjectItem({
                                      item,
                                      selectedTags,
                                      handleTagClick,
                                      highlightText,
                                    }: Props) {
  const { mainWidth } = useExpandCollapseContext();
  const showSeeMore = (project: ProjectItemType) => {
    return project.description.length > 0;
  };

  return (
    <li
      key={item.name}
      className={`${styles.item} ${mainWidth < COMPONENT_MIN_WIDTH ? styles['main-reduced'] : ''}`}
    >
      <h3 className={styles.title}>
        {item.favicon && (
          <Image
            src={item.favicon}
            alt={item.name}
            width={FAVICON_SIZE}
            height={FAVICON_SIZE}
            className={classNames(styles.favicon, {
              [styles.dark]: item.dark,
            })}
          />
        )}

        {highlightText(item.name)}
      </h3>

      <div className={styles.summary}>
        {highlightText(item.summary)}
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

      {showSeeMore(item) && (
        <div className={styles.info}>
          <button>Ver más</button>

          {item.logo && (
            <Image
              src={item.logo}
              alt={item.name}
              layout="intrinsic"
              width={150}
              height={50}
            />
          )}
          <p>{highlightText(item.description)}</p>
        </div>
      )}
    </li>
  );
}