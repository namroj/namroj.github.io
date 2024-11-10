import { ChangeEvent } from 'react';

import { FaDeleteLeft } from 'react-icons/fa6';
import styles from './KeywordSearch.module.scss';

interface Props {
  keyword: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
}

export default function KeywordSearch({
  keyword,
  handleSearchChange,
  handleClearSearch,
}: Props) {
  return (
    <div className={styles['keyword-search']}>
      <span className={styles.title}>Filtrar por palabra clave</span>
      <div className={styles.search}>
        <input
          type="text"
          value={keyword}
          onChange={handleSearchChange}
          placeholder="Escribe para buscar..."
        />
        <button
          type="button"
          className={`${styles.clear} ${keyword ? styles.visible : ''}`}
          onClick={handleClearSearch}
        >
          <FaDeleteLeft /> <span>Borrar</span>
        </button>
      </div>
    </div>
  );
}
