import { Metadata } from 'next';
import readJsonFile from '@/utils/files';

import { Breadcrumb } from '@/providers/navigation/NavigationProvider';
import Breadcrumbs from '@/components/main/breadcrumbs/Breadcrumbs';
import Projects from '@/app/projects/components/Projects';
import { ProjectItemType } from '@/app/projects/components/ProjectItem';

import { FaCode } from 'react-icons/fa6';

export const metadata: Metadata = {
  title: 'Proyectos | Jorman Espinoza',
};

export default async function ProjectsPage() {
  const breadcrumbs: Breadcrumb[] = [{ label: 'Proyectos', icon: <FaCode /> }];
  const projects = (await readJsonFile('app/projects', 'data.json')) as
    | ProjectItemType[]
    | [];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <h2>Proyectos</h2>

      <p>Acá una lista de alguno de los proyectos que desarrollé:</p>

      <Projects data={projects} />
    </>
  );
}
