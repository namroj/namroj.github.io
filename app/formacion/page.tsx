import { Metadata } from 'next'
import path from 'path'
import { readFile } from 'fs/promises'

import Breadcrumbs, { Breadcrumb } from '@/components/main/breadcrumbs/Breadcrumbs'
import Formation, { FormationItem } from './components/Formation'

import { ImBooks } from 'react-icons/im'

import styles from './page.module.scss'

export const metadata: Metadata = {
  title: 'Formación | Jorman Espinoza'
}

const getFormation = async () => {
  const filePath = path.join(process.cwd(), 'app/formacion', 'data.json')
  const jsonData = await readFile(filePath)

  return JSON.parse(jsonData.toString())
}

export default async function FormationPage() {
  const breadcrumbs: Breadcrumb[] = [{ label: 'Formación', href: '', icon: <ImBooks /> }]
  const formation: FormationItem[] = await getFormation()

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <h2>Formación</h2>

      <div className={styles.intro}>
        <p>
          Registro de mi formación académica y profesional.<br />
          Por supuesto, existen otras fuentes de las cuales he adquirido conocimientos, tales como:
        </p>

        <ul>
          <li>YouTube</li>
          <li>Libros</li>
          <li>Blogs</li>
          <li>Documentación oficial/de terceros</li>
          <li>Proyectos laborales/personales</li>
        </ul>
      </div>

      <Formation formation={formation} />
    </>
  )
}
