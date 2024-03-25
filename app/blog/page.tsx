import { Metadata } from 'next'
import Link from 'next/link'

import Breadcrumbs, { Breadcrumb } from '@/app/_components/main/breadcrumbs/Breadcrumbs'

import { FaKeyboard } from 'react-icons/fa6'

export const metadata: Metadata = {
  title: 'Jorman Espinoza | Blog'
}

export default function Blog() {
  const breadcrumbs: Breadcrumb[] = [{ label: 'Blog', icon: <FaKeyboard /> }]

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <h2>Blog</h2>

      <br />
      <Link href='/blog/test' style={{ textDecoration: 'underline', fontSize: 'italic' }}>
        Artículo de prueba
      </Link>
    </>
  )
}
