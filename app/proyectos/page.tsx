import { Metadata } from 'next'

import Breadcrumbs, { Breadcrumb } from '@/components/main/breadcrumbs/Breadcrumbs'

import { FaCode } from 'react-icons/fa6'

export const metadata: Metadata = {
  title: 'Proyectos | Jorman Espinoza'
}

export default function ProjectsPage() {
  const breadcrumbs: Breadcrumb[] = [{ label: 'Proyectos', icon: <FaCode /> }]

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <h2>Proyectos</h2>
    </>
  )
}
