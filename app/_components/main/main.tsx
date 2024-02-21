'use client'

import { useGeneralContext } from '@/app/_context'
import { SidebarState } from '@/app/_context/general/general-context-provider'

import './main.scss'

const Main = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const { sidebarState } = useGeneralContext()

    const getCollapsedOrExpandedState = () =>
        sidebarState === SidebarState.COLLAPSED ? SidebarState.EXPANDED : SidebarState.COLLAPSED

    return (
        <main className={`main ${getCollapsedOrExpandedState()}`}>
            {children}
        </main >
    )
}

export default Main