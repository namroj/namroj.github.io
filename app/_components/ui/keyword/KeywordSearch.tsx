import { ChangeEvent } from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useLanguage } from '@/providers/language/LanguageProvider';
import styles from './KeywordSearch.module.scss';

interface Props {
  keyword: string;
  placeholder?: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
}

export default function KeywordSearch({
                                        keyword,
                                        placeholder,
                                        handleSearchChange,
                                        handleClearSearch,
                                      }: Props) {
  const { t } = useLanguage();

  return (
    <div className={styles['keyword-search']}>
      <span className={styles.title}>{t('blog.filter_label')}</span>
      <div className={styles.search}>
        <input
          type="text"
          value={keyword}
          onChange={handleSearchChange}
          placeholder={placeholder || t('blog.search_placeholder')}
        />
        <button
          type="button"
          className={`${styles.clear} ${keyword ? styles.visible : ''}`}
          onClick={handleClearSearch}
        >
          <FaDeleteLeft /> <span>{t('blog.clear_label')}</span>
        </button>
      </div>
    </div>
  );
}
