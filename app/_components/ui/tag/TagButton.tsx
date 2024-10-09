import {FC} from 'react'

import styles from './TagButton.module.scss'

type Props = {
  tag: string
  handleTagClick: (tag: string) => void
  selectedTags: string[]
  highlightText?: (text: string) => JSX.Element
}

const TagButton: FC<Props> = ({tag, handleTagClick, selectedTags, highlightText}) => (
  <button className={styles.tag} onClick={() => handleTagClick(tag)}>
    <code className={selectedTags.includes(tag) ? styles.active : ''}>{highlightText ? highlightText(tag) : tag}</code>
  </button>
)

export default TagButton