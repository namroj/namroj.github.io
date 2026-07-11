'use client';

import React, { useState } from 'react';
import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';
import { useLanguage } from '@/providers/language/LanguageProvider';
import ProjectItem, { ProjectItemType } from '@/app/projects/components/ProjectItem';
import Highlighter from 'react-highlight-words';
import TagsFilter from '@/components/ui/tag/filter/TagsFilter';
import KeywordSearch from '@/components/ui/keyword/KeywordSearch';
import { LuPackageSearch } from 'react-icons/lu';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import styles from './Projects.module.scss';

export default function Projects({
                                   data,
                                   allTags,
                                 }: Readonly<{ data: ProjectItemType[]; allTags: string[] }>) {
  const { mainWidth } = useExpandCollapseContext();
  const { t, language } = useLanguage();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { items: filteredProjects, loading, hasMore, observerTarget } = useInfiniteScroll<ProjectItemType>({
    type: 'projects',
    initialData: data,
    search: searchTerm,
    tags: selectedTags,
    language,
  });

  const handleClearTags = () => setSelectedTags([]);

  const handleClearSearch = () => setSearchTerm('');

  const handleResetFilters = () => {
    setSelectedTags([]);
    setSearchTerm('');
  };

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
        tags={allTags}
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

  const projects =
    filteredProjects.length === 0 && !loading ? (
      <div className={styles.empty}>
        <span className={styles.icon}>
          <LuPackageSearch />
        </span>
        <div className={styles.message}>
          <span>{t('blog.no_results')}</span>
          <button className={styles.resetButton} onClick={handleResetFilters}>
            {t('blog.clear_filters')}
          </button>
        </div>
      </div>
    ) : (
      <>
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
        {hasMore && (
          <div ref={observerTarget} className={styles.loading}>
            {loading && <span>{t('common.loading')}...</span>}
          </div>
        )}
      </>
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