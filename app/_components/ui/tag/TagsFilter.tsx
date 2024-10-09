import React, { FC } from 'react'
import { normalizeAndCleanString } from '@/app/_utils/strings'

import TagButton from './TagButton'

import { RiArrowGoBackFill } from 'react-icons/ri'
import styles from './TagsFilter.module.scss'

type Props = {
  tags: string[]
  selectedTags: string[]
  handleTagClick: (tag: string) => void
  handleClearTags: () => void
};

const TagsFilter: FC<Props> = ({ tags, selectedTags, handleTagClick, handleClearTags }) => {
  const sortedTags = tags.slice().sort((a, b) => normalizeAndCleanString(a).localeCompare(normalizeAndCleanString(b)))

  return (
    <div className={styles['tags-filter']}>
      <span className={styles.title}>Filtrar por etiquetas</span>
      <div className={styles.tags}>
        {sortedTags.map((tag, index) => (
          <TagButton key={index} tag={tag} handleTagClick={handleTagClick} selectedTags={selectedTags} />
        ))}
      </div>
      <button className={`${styles.clear} ${selectedTags.length > 0 && styles.visible}`} onClick={handleClearTags}>
        <RiArrowGoBackFill /> <span>Desmarcar</span>
      </button>
    </div>
  )
}

export default TagsFilter