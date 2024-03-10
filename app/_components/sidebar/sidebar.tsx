'use client'

import { useGeneralContext } from '@/app/_context'

import Nav from './nav/nav'
import Toggler from './toggler/toggler'
import Links from './links/links'

import './sidebar.scss'

export default function Sidebar() {
    const { sidebarState } = useGeneralContext()

    return (
        <aside className={`${sidebarState}`}>
            <Toggler />
            <Nav />
            <Links />
        </aside>
    )
}