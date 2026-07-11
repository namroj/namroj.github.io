'use client';

import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { PostMetaData } from '@/utils/posts';
import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';
import { useLanguage } from '@/providers/language/LanguageProvider';
import TagsFilter from '@/components/ui/tag/filter/TagsFilter';
import KeywordSearch from '@/components/ui/keyword/KeywordSearch';
import { LuPackageSearch } from 'react-icons/lu';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import PostItem from './PostItem';
import styles from './Posts.module.scss';

interface Props {
  posts: PostMetaData[];
  allTags: string[];
}

export default function Posts({ posts, allTags }: Props) {
  const { mainWidth } = useExpandCollapseContext();
  const { t, language } = useLanguage();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { items: filteredPosts, loading, hasMore, observerTarget } = useInfiniteScroll<PostMetaData>({
    type: 'post',
    initialData: posts,
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
      className={`${styles.filters} ${mainWidth < 1280 ? styles.mainReduced : ''}`}
    >
      <TagsFilter
        tags={allTags}
        selectedTags={selectedTags}
        handleTagClick={handleTagClick}
        handleClearTags={handleClearTags}
      />
      <KeywordSearch
        keyword={searchTerm}
        placeholder={t('blog.search_placeholder')}
        handleSearchChange={handleSearchChange}
        handleClearSearch={handleClearSearch}
      />
    </div>
  );

  const postList =
    filteredPosts.length === 0 && !loading ? (
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
        <div className={styles.items}>
          {filteredPosts.map((item: PostMetaData) => (
            <PostItem
              key={item.slug}
              item={item}
              handleTagClick={handleTagClick}
              selectedTags={selectedTags}
              highlightText={highlightText}
            />
          ))}
        </div>
        {hasMore && (
          <div ref={observerTarget} className={styles.loading}>
            {loading && <span>{t('common.loading')}...</span>}
          </div>
        )}
      </>
    );

  return (
    <div
      className={`${styles.posts} ${mainWidth < 1920 && styles.mainReduced}`}
    >
      {posts.length > 0 && filters}
      <div
        className={`${styles.timeline} ${mainWidth < 1920 && styles.mainReduced}`}
      >
        <hr />

        {postList}
      </div>
    </div>
  );
}
