import { useGeneralContext } from '@/app/_context'
import { SidebarState } from '@/app/_context/general/general-context-provider'

import { BiCollapseAlt } from 'react-icons/bi'
import { BsArrowsAngleExpand } from 'react-icons/bs'

import './toggler.scss'

export default function Toggler() {
    const { sidebarState, toggleSidebarState } = useGeneralContext()

    return (
        <button className='toggler' onClick={toggleSidebarState}>
            {sidebarState === SidebarState.COLLAPSED ? <BsArrowsAngleExpand size={15} /> : <BiCollapseAlt size={16} />}
        </button>
    )
}