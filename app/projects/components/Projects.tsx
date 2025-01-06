'use client';

import React, { useState } from 'react';

import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';
import ProjectItem, { ProjectItemType } from '@/app/projects/components/ProjectItem';
import Highlighter from 'react-highlight-words';
import TagsFilter from '@/components/ui/tag/filter/TagsFilter';
import KeywordSearch from '@/components/ui/keyword/KeywordSearch';
import normalizeAndCleanString from '@/utils/strings';
import { LuPackageSearch } from 'react-icons/lu';
import styles from './Projects.module.scss';

export default function Projects({
                                   data,
                                 }: Readonly<{ data: ProjectItemType[] }>) {
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
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
      className={`${styles.filters} ${mainWidth < 993 ? styles.mainReduced : ''}`}
    >
      <TagsFilter
        tags={Array.from(new Set(data.flatMap((item) => item.tags)))}
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

  const filteredProjects = data.filter((item) => {
    const { tags, ...rest } = item;
    const itemValues = Object.values(rest).filter(
      (value) => typeof value !== 'object',
    );
    const tagsKeywords = tags.join(' ');
    const itemKeywords = normalizeAndCleanString(
      [...itemValues, item.name, tagsKeywords].join('').toLowerCase(),
    );
    const isTagSelected =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => item.tags.includes(tag));
    const isSearchTermPresent =
      searchTerm === '' ||
      itemKeywords.includes(normalizeAndCleanString(searchTerm));

    return isTagSelected && isSearchTermPresent;
  });

  const projects =
    filteredProjects.length === 0 ? (
      <div className={styles.empty}>
        <span className={styles.icon}>
          <LuPackageSearch />
        </span>
        <span>
          No se encontraron resultados. Prueba con otra palabra clave.
        </span>
      </div>
    ) : (
      <ul className={styles.items}>
        <div className="content">
          {filteredProjects.map((item: ProjectItemType) => (
            <ProjectItem
              key={item.name}
              item={item}
              handleTagClick={handleTagClick}
              selectedTags={selectedTags}
              highlightText={highlightText}
            />
          ))}
          <div className="fade-effect" />
        </div>
      </ul>
    );

  return (
    <div
      className={`${styles.projects} ${mainWidth < 993 && styles.mainReduced}`}
    >
      {filters}
      <div
        className={`${styles.timeline} ${mainWidth < 993 && styles.mainReduced}`}
      >
        <hr />
        {projects}
      </div>
    </div>
  );
}