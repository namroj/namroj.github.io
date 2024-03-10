import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useMedia from 'use-media'

import { useGeneralContext } from '@/app/_context'

import './nav.scss'

interface NavItem {
    path: string
    label: string
}

export default function Nav() {
    const { toggleSidebarState } = useGeneralContext()
    const pathname = usePathname()
    const isMobile = useMedia({ maxWidth: '768px' })

    const setActivePathClass = (path: string) => pathname === path ? 'active' : ''

    const handleLinkClick = () => {
        if (isMobile) toggleSidebarState()
    }

    const navItems: NavItem[] = [
        { path: "/formation", label: "Formación" },
        { path: "/professional-experience", label: "Experiencia" },
        { path: "/projects", label: "Proyectos" },
        { path: "/fonts", label: "Tipografías" },
        { path: "/contact", label: "Contacto" }
    ];

    return (
        <nav>
            {navItems.map(item => (
                <Link
                    className={setActivePathClass(item.path)}
                    href={item.path}
                    onClick={handleLinkClick}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}