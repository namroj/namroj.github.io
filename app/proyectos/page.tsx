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

      <p>Acá una lista de alguno de los proyectos que desarrollé:</p>

      <ul>
        <li><a href="https://www.bocadetoro.com" target="_blank">Boca de Toro</a></li>
        <li><a href="ttps://lasyungas.com" target="_blank">Las Yungas</a></li>
        <li><a href="https://www.friggorina.com" target="_blank">Friggorina</a></li>
        <li><a href="https://www.dazarealestate.com" target="_blank">Daza</a></li>
        <li><a href="https://www.dazarealestate.com/proper" target="_blank">Daza - Proper</a></li>
        <li><a href="https://codigonatural.com.ar" target="_blank">Código Natural</a></li>
        <li><a href="https://www.dub.com.ar" target="_blank">Dub</a></li>
        <li><a href="https://pablomanso.com" target="_blank">Pablo Manso</a></li>
      </ul>
    </>
  );
}
