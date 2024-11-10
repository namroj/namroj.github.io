import normalizeAndCleanString from '@/app/_utils/strings';

import { RiArrowGoBackFill } from 'react-icons/ri';

import TagButton from '@/components/ui/tag/TagButton';
import styles from './TagsFilter.module.scss';

type Props = {
  tags: string[];
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
  handleClearTags: () => void;
};

export default function TagsFilter({
  tags,
  selectedTags,
  handleTagClick,
  handleClearTags,
}: Props) {
  const sortedTags = tags
    .slice()
    .sort((a, b) =>
      normalizeAndCleanString(a).localeCompare(normalizeAndCleanString(b)),
    );

  return (
    <div className={styles['tags-filter']}>
      <span className={styles.title}>Filtrar por etiquetas</span>
      <div className={styles.tags}>
        {sortedTags.map((tag) => (
          <TagButton
            key={tag}
            tag={tag}
            handleTagClick={handleTagClick}
            selectedTags={selectedTags}
          />
        ))}
      </div>
      <button
        type="button"
        className={`${styles.clear} ${selectedTags.length > 0 && styles.visible}`}
        onClick={handleClearTags}
      >
        <RiArrowGoBackFill /> <span>Desmarcar</span>
      </button>
    </div>
  );
}
