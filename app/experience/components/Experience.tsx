'use client';

import { ChangeEvent, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';
import { useLanguage } from '@/providers/language/LanguageProvider';
import TagsFilter from '@/components/ui/tag/filter/TagsFilter';
import KeywordSearch from '@/components/ui/keyword/KeywordSearch';
import { LuPackageSearch } from 'react-icons/lu';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { ExperienceItem, ExperienceItemType } from './ExperienceItem';
import styles from './Experience.module.scss';

export default function Experience({
                                     data,
                                     allTags,
                                   }: Readonly<{ data: ExperienceItemType[]; allTags: string[] }>) {
  const { mainWidth } = useExpandCollapseContext();
  const { t, language } = useLanguage();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { items: filteredExperience, loading, hasMore, observerTarget } = useInfiniteScroll<ExperienceItemType>({
    type: 'experience',
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

  const experience =
    filteredExperience.length === 0 && !loading ? (
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
          {filteredExperience.map((item: ExperienceItemType) => (
            <ExperienceItem
              key={item.entity.name}
              item={item}
              handleTagClick={handleTagClick}
              selectedTags={selectedTags}
              highlightText={highlightText}
            />
          ))}
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
      className={`${styles.experience} ${mainWidth < 993 ? styles.mainReduced : ''}`}
    >
      {filters}
      <div
        className={`${styles.timeline} ${mainWidth < 993 ? styles.mainReduced : ''}`}
      >
        <hr />

        {experience}
      </div>
    </div>
  );
}
