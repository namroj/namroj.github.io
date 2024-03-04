'use client'

import { FC, ReactNode } from 'react'
import Link from 'next/link'

import { IoHeadsetSharp } from 'react-icons/io5'
import './breadcrumbs.scss'

export interface BreadcrumbItem {
    label: string
    href: string
    icon: ReactNode
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
    items = [{ label: 'Jorman', href: '/', icon: <IoHeadsetSharp /> }, ...items]

    return (
        <div className="breadcrumbs">
            {items.map((item, index) => (
                <div className="item" key={index}>
                    {item.href ? (
                        <Link href={item.href} className="linked">
                            <>{item.icon} <span>{item.label}</span></>
                        </Link>
                    ) : (
                        <a href="/" style={{ cursor: 'auto' }} onClick={(e) => e.preventDefault()}>{item.icon} <span>{item.label}</span></a>
                    )}
                    {index < items.length - 1 && <span className="connector">{'>'}</span>}
                </div>
            ))}
        </div>
    )
}

export default Breadcrumbs