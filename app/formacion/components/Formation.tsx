'use client'

import { useState } from 'react'
import Highlighter from 'react-highlight-words'

import { RiArrowGoBackFill } from 'react-icons/ri'
import { FaDeleteLeft } from 'react-icons/fa6'
import { TbExternalLink } from 'react-icons/tb'
import { LuPackageSearch } from 'react-icons/lu'

import styles from './Formation.module.scss'

export type FormationItem = {
  title: string
  entity: { name: string; url: string }
  location: string
  interval: string
  description: string
  tags: string[]
  certificate?: string
}

export default function FormationList({ formation }: Readonly<{ formation: FormationItem[] }>) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleClearTags = () => setSelectedTags([])

  const handleClearSearch = () => setSearchTerm('')

  const normalizeAndCleanString = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .toLowerCase()
  }

  const handleTagClick = (tag: string) =>
    setSelectedTags((prevTags) => (prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]))

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)

  const highlightText = (text: string) => {
    return (
      <Highlighter
        highlightClassName={styles.highlight}
        searchWords={[searchTerm]}
        autoEscape={true}
        textToHighlight={text}
      />
    )
  }

  const tagFilter = (
    <div className={styles['tag-filter']}>
      <span className={styles.title}>Filtrar por etiquetas:</span>
      <div className={styles.tags}>
        {Array.from(new Set(formation.flatMap((item) => item.tags)))
          .sort((a, b) => normalizeAndCleanString(a).localeCompare(normalizeAndCleanString(b)))
          .map((tag, index) => (
            <button
              key={index}
              className={selectedTags.includes(tag) ? styles.active : ''}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
      </div>
      <button className={`${styles.clear} ${selectedTags.length > 0 && styles.visible}`} onClick={handleClearTags}>
        <RiArrowGoBackFill /> <span>Desmarcar</span>
      </button>
    </div>
  )

  const textSearch = (
    <div className={styles['text-search']}>
      <span className={styles.title}>Filtrar por palabra clave:</span>
      <div className={styles.search}>
        <input type='text' value={searchTerm} onChange={handleSearchChange} placeholder='Escribe para buscar...' />
        <button className={`${styles.clear} ${searchTerm && styles.visible}`} onClick={handleClearSearch}>
          <FaDeleteLeft /> <span>Borrar</span>
        </button>
      </div>
    </div>
  )

  const filteredFormation = formation.filter((item) => {
    const { certificate, entity, tags, ...rest } = item
    const itemValues = Object.values(rest).filter((value) => typeof value !== 'object')
    const tagsString = tags.join(' ')
    const itemString = normalizeAndCleanString([...itemValues, tagsString].join('').toLowerCase())

    const isTagSelected = selectedTags.length === 0 || selectedTags.some((tag) => item.tags.includes(tag))
    const isSearchTermPresent = searchTerm === '' || itemString.includes(normalizeAndCleanString(searchTerm))

    return isTagSelected && isSearchTermPresent
  })

  const formationList =
    filteredFormation.length === 0 ? (
      <div className={styles.empty}>
        <span className={styles.icon}>
          <LuPackageSearch />
        </span>
        <span>No se encontraron resultados. Prueba con otra palabra clave.</span>
      </div>
    ) : (
      filteredFormation.map((item: FormationItem, index: number) => (
        <li key={index}>
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
            <p className={styles.description}>{highlightText(item.description)}</p>
            <div className={styles.tags}>
              <ul>
                {item.tags.map((tag, index) => (
                  <li key={index}>
                    <code className={selectedTags.includes(tag) ? styles.active : ''}>{highlightText(tag)}</code>
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
      ))
    )

  return (
    <ul className={styles.timeline}>
      {tagFilter}

      {textSearch}

      <hr />

      {formationList}
    </ul>
  )
}
