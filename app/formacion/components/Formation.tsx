'use client'

import { useState } from 'react'

import Highlighter from 'react-highlight-words'

import { normalizeAndCleanString } from '@/utils/strings'
import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider'

import FormationItem, { FormationItemType } from './FormationItem'

import { RiArrowGoBackFill } from 'react-icons/ri'
import { FaDeleteLeft } from 'react-icons/fa6'
import { LuPackageSearch } from 'react-icons/lu'

import styles from './Formation.module.scss'

export default function Formation({ formationData }: Readonly<{ formationData: FormationItemType[] }>) {
  const { mainWidth } = useExpandCollapseContext()

  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleClearTags = () => setSelectedTags([])

  const handleClearSearch = () => setSearchTerm('')

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
      <span className={styles.title}>Filtrar por etiquetas</span>
      <div className={styles.tags}>
        {Array.from(new Set(formationData.flatMap((item) => item.tags)))
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
      <span className={styles.title}>Filtrar por palabra clave</span>
      <div className={styles.search}>
        <input type='text' value={searchTerm} onChange={handleSearchChange} placeholder='Escribe para buscar...' />
        <button className={`${styles.clear} ${searchTerm && styles.visible}`} onClick={handleClearSearch}>
          <FaDeleteLeft /> <span>Borrar</span>
        </button>
      </div>
    </div>
  )

  const filters = (
    <div className={`${styles.filters} ${mainWidth < 768 ? styles['main-reduced'] : ''}`}>
      {tagFilter}
      {textSearch}
    </div>
  )

  const filteredFormation = formationData.filter((item) => {
    const { certificate, entity, tags, ...rest } = item
    const itemValues = Object.values(rest).filter((value) => typeof value !== 'object')
    const tagsKeywords = tags.join(' ')
    const itemKeywords = normalizeAndCleanString([...itemValues, entity.name, tagsKeywords].join('').toLowerCase())

    const isTagSelected = selectedTags.length === 0 || selectedTags.some((tag) => item.tags.includes(tag))
    const isSearchTermPresent = searchTerm === '' || itemKeywords.includes(normalizeAndCleanString(searchTerm))

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
      filteredFormation.map((item: FormationItemType, index: number) => (
        <FormationItem
          key={index}
          item={item}
          handleTagClick={handleTagClick}
          selectedTags={selectedTags}
          highlightText={highlightText}
        />
      ))
    )

  return (
    <div className={`${styles.formation} ${mainWidth < 768 && styles['main-reduced']}`}>
      {filters}
      <div className={`${styles.timeline} ${mainWidth < 768 && styles['main-reduced']}`}>
        <hr />
        <ul>{formationList}</ul>
      </div>
    </div>
  )
}
