import { FC } from 'react'

import styles from './Tag.module.scss'

const Tag: FC<{
  tag: string
  handleTagClick: (tag: string) => void
  selectedTags: string[]
  highlightText: (text: string) => JSX.Element
}> = ({ tag, handleTagClick, selectedTags, highlightText }) => (
  <button className={styles.tag} onClick={() => handleTagClick(tag)}>
    <code className={selectedTags.includes(tag) ? styles.active : ''}>{highlightText(tag)}</code>
  </button>
)

export default Tag
