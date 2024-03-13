import { ReactNode } from 'react'
import { Metadata } from 'next'

import Breadcrumbs, { Breadcrumb } from '@/app/_components/main/breadcrumbs/breadcrumbs'

import { FaKeyboard } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Jorman Espinoza | Blog',
  description: 'Desarrollador Full-stack - Blog'
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const breadcrumbs: Breadcrumb[] = [
    { label: 'Blog', href: '/blog', icon: <FaKeyboard /> }
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <section>{children}</section>
    </>
  )
}