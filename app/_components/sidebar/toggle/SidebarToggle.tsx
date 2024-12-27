import {
  ExpandCollapseState,
  useExpandCollapseContext,
} from '@/providers/expand-collapse/ExpandCollapseProvider';
import { BiCollapseAlt } from 'react-icons/bi';
import { BsArrowsAngleExpand } from 'react-icons/bs';
import styles from './SidebarToggle.module.scss';

export default function SidebarToggle() {
  const { expandCollapseState, toggleExpandCollapseState } =
    useExpandCollapseContext();

  return (
    <button
      type="button"
      className={`${styles.toggle} ${styles[expandCollapseState]}`}
      onClick={toggleExpandCollapseState}
    >
      {expandCollapseState === ExpandCollapseState.COLLAPSED ? (
        <BsArrowsAngleExpand size={15} />
      ) : (
        <BiCollapseAlt size={16} />
      )}
    </button>
  );
}
