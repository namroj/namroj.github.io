import { Metadata } from 'next';

import readJsonFile from '@/utils/files';

import Breadcrumbs, {
  Breadcrumb,
} from '@/components/main/breadcrumbs/Breadcrumbs';

import { MdLaptop } from 'react-icons/md';
import { ExperienceItemType } from '@/app/experiencia/components/ExperienceItem';
import Experience from './components/Experience';

export const metadata: Metadata = {
  title: 'Experiencia | Jorman Espinoza',
};

export default async function ProfessionalExperiencePage() {
  const breadcrumbs: Breadcrumb[] = [
    { label: 'Experiencia', icon: <MdLaptop /> },
  ];

  const data: ExperienceItemType[] = await readJsonFile(
    'app/experiencia',
    'data.json',
  );

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <h2>Experiencia</h2>

      <p>Registro de mi experiencia laboral.</p>

      <Experience experienceData={data} />
    </>
  );
}
