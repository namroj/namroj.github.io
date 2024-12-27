import { Metadata } from 'next';
import readJsonFile from '@/utils/files';
import { Breadcrumb } from '@/providers/navigation/NavigationProvider';
import { ExperienceItemType } from '@/app/experience/components/ExperienceItem';
import Breadcrumbs from '@/components/main/breadcrumbs/Breadcrumbs';
import { MdLaptop } from 'react-icons/md';
import Experience from './components/Experience';

export const metadata: Metadata = {
  title: 'Experiencia | Jorman Espinoza',
};

export default async function ProfessionalExperiencePage() {
  const breadcrumbs: Breadcrumb[] = [
    { label: 'Experiencia', icon: <MdLaptop /> },
  ];

  const experience = (await readJsonFile('app/experience', 'data.json')) as
    | ExperienceItemType[]
    | [];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <h2>Experiencia</h2>

      <p>Registro de mi experiencia laboral.</p>

      <Experience data={experience} />
    </>
  );
}
