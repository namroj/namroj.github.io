import React from 'react'

import { TbExternalLink } from 'react-icons/tb'

import styles from './FormationItem.module.scss'

export type FormationItemType = {
  title: string
  entity: { name: string; url: string }
  location: string
  interval: string
  description: string
  tags: string[]
  certificate?: string
}

const FormationItem: React.FC<{
  item: FormationItemType
  selectedTags: string[]
  handleTagClick: (tag: string) => void
  highlightText: (text: string) => JSX.Element
}> = ({ item, handleTagClick, selectedTags, highlightText }) => {
  return (
    <li className={styles.item}>
      <article>
        <p className={styles.date}>{highlightText(item.interval)}</p>
        <h3>{highlightText(item.title)}</h3>
        <h4>
          {item.entity.url ? (
            <a href={item.entity.url} target='_blank'>
              {' '}
              {highlightText(item.entity.name)}
            </a>
          ) : (
            highlightText(item.entity.name)
          )}
          . {highlightText(item.location)}.
        </h4>
        <p className={styles.description}>{highlightText(item.description)}.</p>
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
          {item.certificate && (
            <code className={styles.certificate}>
              <a href={item.certificate} target='_blank'>
                <TbExternalLink /> Certificado
              </a>
            </code>
          )}
        </div>
      </article>
    </li>
  )
}

export default FormationItem
