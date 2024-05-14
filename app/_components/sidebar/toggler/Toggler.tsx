import { ExpandCollapseState, useExpandCollapseContext } from '@/providers/expand-collapse/ExpandCollapseProvider'

import { BiCollapseAlt } from 'react-icons/bi'
import { BsArrowsAngleExpand } from 'react-icons/bs'
import styles from './Toggler.module.scss'

export default function Toggler() {
  const { expandCollapseState, toggleExpandCollapseState } = useExpandCollapseContext()

  return (
    <button className={`${styles.toggler} ${styles[expandCollapseState]}`} onClick={toggleExpandCollapseState}>
      {expandCollapseState === ExpandCollapseState.COLLAPSED ? (
        <BsArrowsAngleExpand size={15} />
      ) : (
        <BiCollapseAlt size={16} />
      )}
    </button>
  )
}
