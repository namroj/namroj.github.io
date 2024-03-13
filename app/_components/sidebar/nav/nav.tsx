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
    const pathname = usePathname()
    const isMobile = useMedia({ maxWidth: '768px' })
    const { toggleSidebarState } = useGeneralContext()

    const setActivePathClass = (path: string) => pathname === path ? 'active' : ''

    const handleLinkClick = () => {
        if (isMobile) toggleSidebarState()
    }

    const navItems: NavItem[] = [
        { path: "/formacion", label: "Formación" },
        { path: "/experiencia", label: "Experiencia" },
        { path: "/proyectos", label: "Proyectos" },
        { path: "/tipografias", label: "Tipografías" },
        { path: "/blog", label: "Blog" },
        { path: "/contacto", label: "Contacto" }
    ];

    return (
        <nav>
            {navItems.map((item, index) => (
                <Link
                    className={setActivePathClass(item.path)}
                    href={item.path}
                    onClick={handleLinkClick}
                    key={index}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}