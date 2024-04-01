import { Metadata } from 'next'
import Link from 'next/link'

import Breadcrumbs, { Breadcrumb } from '@/components/main/breadcrumbs/Breadcrumbs'

import { FaKeyboard } from 'react-icons/fa6'

export const metadata: Metadata = {
  title: 'Blog | Jorman Espinoza'
}

export default function BlogPage() {
  const breadcrumbs: Breadcrumb[] = [{ label: 'Blog', icon: <FaKeyboard /> }]

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <h2>Blog</h2>

      <br />
      <Link href='/blog/prueba' style={{ textDecoration: 'underline', fontSize: 'italic' }}>
        Prueba
      </Link>
    </>
  )
}
