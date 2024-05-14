import { FC } from 'react'

import { FaDeleteLeft } from 'react-icons/fa6'
import styles from './KeywordSearch.module.scss'

const KeywordSearch: FC<{
  keyword: string
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleClearSearch: () => void
}> = ({ keyword, handleSearchChange, handleClearSearch }) => {
  return (
    <div className={styles['keyword-search']}>
      <span className={styles.title}>Filtrar por palabra clave</span>
      <div className={styles.search}>
        <input type='text' value={keyword} onChange={handleSearchChange} placeholder='Escribe para buscar...' />
        <button className={`${styles.clear} ${keyword ? styles.visible : ''}`} onClick={handleClearSearch}>
          <FaDeleteLeft /> <span>Borrar</span>
        </button>
      </div>
    </div>
  )
}

export default KeywordSearch
