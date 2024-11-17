'use client';

import React, { useState } from 'react';

import Highlighter from 'react-highlight-words';
import { PostMetaData } from '@/utils/posts';
import normalizeAndCleanString from '@/utils/strings';

import { useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider';
import TagsFilter from '@/components/ui/tag/TagsFilter';
import KeywordSearch from '@/components/ui/keyword/KeywordSearch';

import { LuPackageSearch } from 'react-icons/lu';
import PostItem from './PostItem';
import styles from './PostList.module.scss';

interface Props {
  posts: PostMetaData[];
}

export default function PostList({ posts }: Props) {
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
      className={`${styles.filters} ${mainWidth < 768 ? styles['main-reduced'] : ''}`}
    >
      <TagsFilter
        tags={Array.from(new Set(posts.flatMap((item) => item.tags)))}
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

  const filteredPosts = posts.filter((item) => {
    const { tags, ...rest } = item;
    const itemValues = Object.values(rest).filter(
      (value) => typeof value !== 'object',
    );
    const tagsKeywords = tags.join(' ');
    const itemKeywords = normalizeAndCleanString(
      [...itemValues, tagsKeywords].join('').toLowerCase(),
    );
    const isTagSelected =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => item.tags.includes(tag));
    const isSearchTermPresent =
      searchTerm === '' ||
      itemKeywords.includes(normalizeAndCleanString(searchTerm));

    return isTagSelected && isSearchTermPresent;
  });

  const postList =
    filteredPosts.length === 0 ? (
      <div className={styles.empty}>
        <span className={styles.icon}>
          <LuPackageSearch />
        </span>
        <span>
          No se encontraron resultados. Prueba con otra palabra clave.
        </span>
      </div>
    ) : (
      <div className={styles.posts}>
        {filteredPosts.map((item: PostMetaData) => (
          <PostItem
            key={item.title}
            item={item}
            handleTagClick={handleTagClick}
            selectedTags={selectedTags}
            highlightText={highlightText}
          />
        ))}
      </div>
    );

  return (
    <div
      className={`${styles['post-list']} ${mainWidth < 1280 && styles['main-reduced']}`}
    >
      {filters}
      <div
        className={`${styles.timeline} ${mainWidth < 1280 && styles['main-reduced']}`}
      >
        <hr />

        {postList}
      </div>
    </div>
  );
}
