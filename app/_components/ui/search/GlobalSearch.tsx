'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { initSearchIndex, search, SearchResult, createSnippet } from '@/utils/search';
import { useLanguage } from '@/providers/language/LanguageProvider';
import styles from './GlobalSearch.module.scss';

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { t } = useLanguage();

  const toggleSearch = useCallback(() => {
    setIsOpen((prev) => !prev);
    setQuery('');
    setResults([]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
      if (e.key === '/') {
        if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
        e.preventDefault();
        toggleSearch();
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleSearch]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      if (Object.keys(results).length === 0 && !isLoading) {
        setIsLoading(true);
        fetch('/api/search-data')
          .then((res) => res.json())
          .then((data) => {
            initSearchIndex(data);
            setIsLoading(false);
          });
      }
    }
  }, [isOpen, isLoading, results]);

  useEffect(() => {
    if (query.trim()) {
      setResults(search(query));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (slug: string) => {
    router.push(slug);
    setIsOpen(false);
  };

  return (
    <>
      <button className={styles.trigger} onClick={toggleSearch} title="Search (⌘K or /)">
        <IoSearchOutline />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className={styles.overlay} onClick={() => setIsOpen(false)}>
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.header}>
                <IoSearchOutline className={styles.searchIcon} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={t('blog.global_search_placeholder')}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={styles.input}
                />
                <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                  <IoCloseOutline />
                </button>
              </div>

              <div className={styles.body}>
                {isLoading ? (
                  <div className={styles.status}>{t('blog.global_search_indexing')}</div>
                ) : query && results.length === 0 ? (
                  <div className={styles.status}>
                    {t('blog.global_search_no_results').replace('{query}', query)}
                  </div>
                ) : (
                  <ul className={styles.results}>
                    {results.map((result) => (
                      <li
                        key={result.id}
                        className={styles.resultItem}
                        onClick={() => handleResultClick(result.slug)}
                      >
                        <div className={styles.resultType}>{result.type}</div>
                        <div className={styles.resultTitle}>{result.title}</div>
                        <div className={styles.resultSnippet}>
                          {createSnippet(result.content, query)}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className={styles.footer}>
                <span className={styles.hint}>
                  <kbd>ESC</kbd> {t('blog.global_search_close_hint')}
                </span>
                <span className={styles.hint}>
                  <kbd>ENTER</kbd> {t('blog.global_search_select_hint')}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
