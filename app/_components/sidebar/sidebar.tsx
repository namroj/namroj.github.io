'use client'

import { FC } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useMedia from 'use-media'

import { useGeneralContext } from '@/app/_context'
import { SidebarState } from '@/app/_context/general/general-context-provider'

import './sidebar.scss'

const Sidebar: FC = () => {
    const pathname = usePathname()
    const isMobile = useMedia({ maxWidth: '768px' })
    const { sidebarState, toggleSidebarState } = useGeneralContext()

    const isCurrentPath = (path: string) => pathname === path
    const handleLinkClick = () => {
        if (!isMobile) return
        toggleSidebarState()
    }

    return (
        <aside className={`${sidebarState}`}>
            <button className='toggler' onClick={toggleSidebarState}>
                {sidebarState === SidebarState.COLLAPSED ? '->' : '<-'}
            </button>

            <nav>
                <Link
                    className={isCurrentPath('/formation') ? 'active' : ''}
                    href="/formation"
                    onClick={handleLinkClick}
                >
                    Formación
                </Link>
                <Link
                    className={isCurrentPath('/professional-experience') ? 'active' : ''}
                    href="/professional-experience"
                    onClick={handleLinkClick}
                >
                    Experiencia
                </Link>
                <Link
                    className={isCurrentPath('/projects') ? 'active' : ''}
                    href="/projects"
                    onClick={handleLinkClick}
                >
                    Proyectos
                </Link>
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
