'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { IoHeadsetSharp } from 'react-icons/io5'
import './breadcrumbs.scss'

export interface Breadcrumb {
    label: string
    href?: string
    icon: ReactNode
}

interface BreadcrumbsProps {
    items: Breadcrumb[]
}

export default function Breadcrumbs({ items }: Readonly<BreadcrumbsProps>) {
    const pathname = usePathname()

    items = [{ label: 'Jorman', href: '/', icon: <IoHeadsetSharp /> }, ...items]

    return (
        <div className="breadcrumbs">
            {items.map((item, index) => (
                <div className="item" key={index}>
                    {item.href && pathname !== item.href ? (
                        <Link href={item.href} className="linked">
                            <>{item.icon} <span>{item.label}</span></>
                        </Link>
                    ) : (
                        <a
                            href="/"
                            style={{ cursor: 'auto' }}
                            onClick={(e) => e.preventDefault()}
                        >
                            {item.icon} <span>{item.label}</span>
                        </a>
                    )}
                    {index < items.length - 1 && <span className="connector">{'>'}</span>}
                </div>
            ))}
        </div>
    )
}