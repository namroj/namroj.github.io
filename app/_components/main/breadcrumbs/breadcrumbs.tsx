import { ReactNode } from 'react'

import Link from 'next/link'

import { IoHeadsetSharp } from 'react-icons/io5'
import styles from './breadcrumbs.module.scss'

export interface Breadcrumb {
  label: string
  href?: string
  icon: ReactNode
}

interface BreadcrumbsProps {
  items: Breadcrumb[]
}

export default function Breadcrumbs({ items }: Readonly<BreadcrumbsProps>) {
  items = [{ label: 'Jorman', href: '/', icon: <IoHeadsetSharp /> }, ...items]

  return (
    <div className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <div className={styles.item} key={index}>
          {item.href ? (
            <Link href={item.href} className={styles.linked}>
              <>
                {item.icon} <span>{item.label}</span>
              </>
            </Link>
          ) : (
            <span className={styles.current}>
              {item.icon} <span>{item.label}</span>
            </span>
          )}
          {index < items.length - 1 && <span className={styles.connector}>{'>'}</span>}
        </div>
      ))}
    </div>
  )
}
