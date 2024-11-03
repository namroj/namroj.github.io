import { Metadata } from 'next';

import { Breadcrumb } from '@/providers/navigation/NavigationProvider';
import Breadcrumbs from '@/components/main/breadcrumbs/Breadcrumbs';

import { FaCode } from 'react-icons/fa6';

export const metadata: Metadata = {
  title: 'Proyectos | Jorman Espinoza',
};

export default function ProjectsPage() {
  const breadcrumbs: Breadcrumb[] = [{ label: 'Proyectos', icon: <FaCode /> }];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <h2>Proyectos</h2>

      <ul>
        <li>https://www.bocadetoro.com</li>
        <li>https://lasyungas.com</li>
        <li>https://www.friggorina.com</li>
      </ul>
    </>
  );
}
