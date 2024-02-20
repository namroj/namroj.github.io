'use client'

import { FC } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useGeneralContext } from '@/app/_context'
import { SidebarState } from '@/app/_context/general/general-context-provider'

import './sidebar.scss'

const Sidebar: FC = () => {
    const pathname = usePathname()
    const { sidebarState, toggleSidebarState } = useGeneralContext()

    const isCurrentPath = (path: string) => pathname === path
    const handleLinkClick = () => toggleSidebarState()

    return (
        <aside className={`${sidebarState}`}>
            <button className='toggler' onClick={toggleSidebarState}>
                {sidebarState === SidebarState.COLLAPSED ? '->' : '<-'}
            </button>
            <nav>
                <Link
                    className={isCurrentPath('/fonts') ? 'active' : ''}
                    href="/fonts"
                    onClick={handleLinkClick}
                >
                    Tipografías
                </Link>
                <Link
                    className={isCurrentPath('/contact') ? 'active' : ''}
                    href="/contact"
                    onClick={handleLinkClick}
                >
                    Contacto
                </Link>
            </nav>
        </aside>
    )
}

export default Sidebar
