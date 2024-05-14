import { Metadata } from 'next'
import { readJsonFile } from '@/utils/files'

import Breadcrumbs, { Breadcrumb } from '@/components/main/breadcrumbs/Breadcrumbs'
import Formation from './components/Formation'
import { FormationItemType } from './components/FormationItem'

import { ImBooks } from 'react-icons/im'

export const metadata: Metadata = {
  title: 'Formación | Jorman Espinoza'
}

export default async function FormationPage() {
  const breadcrumbs: Breadcrumb[] = [{ label: 'Formación', href: '', icon: <ImBooks /> }]
  const formationData: FormationItemType[] = await await readJsonFile('app/formacion', 'data.json')

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <h2>Formación</h2>

      <p>
        Registro de mi formación académica y profesional.
        <br />
        Por supuesto, existen otras fuentes de las cuales he adquirido conocimientos, tales como:
      </p>

      <ul>
        <li>YouTube</li>
        <li>Libros</li>
        <li>Blogs</li>
        <li>Documentación oficial/de terceros</li>
        <li>Proyectos laborales/personales</li>
      </ul>

      <Formation formationData={formationData} />
    </>
  )
}
