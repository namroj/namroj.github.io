import React from 'react'

import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider'

import styles from './ExperienceItem.module.scss'

export type ExperienceItemType = {
  entity: { name: string; image?: string; url?: string }
  location: string
  interval: string
  positions: {
    title: string
    extract: string
    description: string
    highlight: string
    interval: string
  }[]
  tags: string[]
}

const ExperienceItem: React.FC<{
  item: ExperienceItemType
  selectedTags: string[]
  handleTagClick: (tag: string) => void
  highlightText: (text: string) => JSX.Element
}> = ({ item, handleTagClick, selectedTags, highlightText }) => {
  const { mainWidth } = useExpandCollapseContext()

  return (
    <li className={styles.item}>
      <article>
        <p className={styles.date}>{highlightText(item.interval)}</p>
        <div className={`${styles.entity} ${mainWidth < 768 && styles['main-reduced']}`}>
          <a href={item.entity.url} target='_blank'>
            <img src={item.entity.image} alt={item.entity.name} />
          </a>
          <h3>
            <a href={item.entity.url} target='_blank'>
              {highlightText(item.entity.name)}
            </a>
          </h3>
          <p>[{highlightText(item.location)}]</p>
        </div>

        <div className={styles.timeline}>
          {item.positions.map((position, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.circle}></div>
              <div className={styles.line}></div>
              <div className={styles.position}>
                <h4>{highlightText(position.title)}</h4>
                <p>{highlightText(position.interval)}</p>
                <p>{highlightText(position.description)}</p>
                <p className={styles['highlight-text']}>{highlightText(position.highlight)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.tags}>
          <ul>
            {item.tags.map((tag, index) => (
              <li key={index}>
                <button onClick={() => handleTagClick(tag)}>
                  <code className={selectedTags.includes(tag) ? styles.active : ''}>{highlightText(tag)}</code>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </li>
  )
}

export default ExperienceItem
