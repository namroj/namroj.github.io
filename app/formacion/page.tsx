import { Metadata } from 'next'
import path from 'path'
import { readFile } from 'fs/promises'

import Breadcrumbs, { Breadcrumb } from '@/components/main/breadcrumbs/Breadcrumbs'
import Formation, { FormationItem } from './components/Formation'

import { ImBooks } from 'react-icons/im'

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

      <Formation formation={formation} />
    </>
  )
}
