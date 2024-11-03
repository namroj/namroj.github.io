'use client';

import { ChangeEvent, useState } from 'react';
import Highlighter from 'react-highlight-words';

import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';
import normalizeAndCleanString from '@/utils/strings';

import TagsFilter from '@/components/ui/tag/TagsFilter';
import KeywordSearch from '@/components/ui/keyword/KeywordSearch';

import { LuPackageSearch } from 'react-icons/lu';
import { ExperienceItem, ExperienceItemType } from './ExperienceItem';
import styles from './Experience.module.scss';

export default function Experience({
  experienceData,
}: Readonly<{ experienceData: ExperienceItemType[] }>) {
  const { mainWidth } = useExpandCollapseContext();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleClearTags = () => setSelectedTags([]);

  const handleClearSearch = () => setSearchTerm('');

  const handleTagClick = (tag: string) =>
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const highlightText = (text: string) => {
    return (
      <Highlighter
        highlightClassName={styles.highlight}
        searchWords={[searchTerm]}
        autoEscape
        textToHighlight={text}
      />
    );
  };

  const filters = (
    <div
      className={`${styles.filters} ${mainWidth < 768 ? styles['main-reduced'] : ''}`}
    >
      <TagsFilter
        tags={Array.from(new Set(experienceData.flatMap((item) => item.tags)))}
        selectedTags={selectedTags}
        handleTagClick={handleTagClick}
        handleClearTags={handleClearTags}
      />
      <KeywordSearch
        keyword={searchTerm}
        handleSearchChange={handleSearchChange}
        handleClearSearch={handleClearSearch}
      />
    </div>
  );

  const filteredExperience = experienceData.filter((item) => {
    const { entity, tags, positions, ...rest } = item;
    const itemValues = Object.values(rest).filter(
      (value) => typeof value !== 'object',
    );
    const positionsValues = positions.map((position) =>
      Object.values(position).filter((value) => typeof value !== 'object'),
    );
    const tagsKeywords = tags.join(' ');
    const itemKeywords = normalizeAndCleanString(
      [...itemValues, ...positionsValues, entity.name, tagsKeywords]
        .join('')
        .toLowerCase(),
    );
    const isTagSelected =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => item.tags.includes(tag));
    const isSearchTermPresent =
      searchTerm === '' ||
      itemKeywords.includes(normalizeAndCleanString(searchTerm));

    return isTagSelected && isSearchTermPresent;
  });

  const experienceList =
    filteredExperience.length === 0 ? (
      <div className={styles.empty}>
        <span className={styles.icon}>
          <LuPackageSearch />
        </span>
        <span>
          No se encontraron resultados. Prueba con otra palabra clave.
        </span>
      </div>
    ) : (
      filteredExperience.map((item: ExperienceItemType) => (
        <ExperienceItem
          key={item.entity.name}
          item={item}
          handleTagClick={handleTagClick}
          selectedTags={selectedTags}
          highlightText={highlightText}
        />
      ))
    );

  return (
    <div
      className={`${styles.experience} ${mainWidth < 900 ? styles['main-reduced'] : ''}`}
    >
      {filters}
      <div
        className={`${styles.timeline} ${mainWidth < 900 ? styles['main-reduced'] : ''}`}
      >
        <hr />
        <ul>{experienceList}</ul>
      </div>
    </div>
  );
}
