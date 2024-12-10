import Image from 'next/image';
import { Link } from 'next-view-transitions';
import moment from 'moment';
import 'moment/locale/es';

import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';
import TagButton from '@/components/ui/tag/btn/TagButton';

import { PostMetaData } from '@/utils/posts';
import styles from './PostItem.module.scss';

const COMPONENT_MIN_WIDTH = 767;

type Props = {
  item: PostMetaData;
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
  highlightText: (text: string) => JSX.Element;
};

export default function PostItem({
                                   item,
                                   selectedTags,
                                   handleTagClick,
                                   highlightText,
                                 }: Props) {
  const { mainWidth } = useExpandCollapseContext();
  return (
    <li className={`${styles['post-item']} ${mainWidth < COMPONENT_MIN_WIDTH && styles['main-reduced']}`}>
      <div className={styles.data}>
        {item.cover_image && (
          <Link href={`/blog/${item.slug}`} className={styles.cover}>
            <Image
              src={item.cover_image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </Link>
        )}

        <div className={styles.text}>
          <span className={styles.date}>{highlightText(moment(item.date).format('MMMM D, YYYY'))}</span>

          <h3 className={styles.title}>
            <Link href={`/blog/${item.slug}`}>
              {highlightText(item.title)}
            </Link>
          </h3>

          <p className={styles.summary}>{highlightText(item.summary)}</p>

          <div className={styles.tags}>
            {item.tags.map((tag) => (
              <TagButton
                key={tag}
                tag={tag}
                handleTagClick={handleTagClick}
                selectedTags={selectedTags}
                highlightText={highlightText}
              />
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}
