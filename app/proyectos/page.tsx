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
        <li><a href="https://www.bocadetoro.com" target="_blank" rel="noreferrer">Boca de Toro</a></li>
        <li><a href="ttps://lasyungas.com" target="_blank" rel="noreferrer">Las Yungas</a></li>
        <li><a href="https://www.friggorina.com" target="_blank" rel="noreferrer">Friggorina</a></li>
        <li><a href="https://www.dazarealestate.com" target="_blank" rel="noreferrer">Daza</a></li>
        <li><a href="https://www.dazarealestate.com/proper" target="_blank" rel="noreferrer">Daza - Proper</a></li>
        <li><a href="https://codigonatural.com.ar" target="_blank" rel="noreferrer">Código Natural</a></li>
        <li><a href="https://www.dub.com.ar" target="_blank" rel="noreferrer">Dub</a></li>
        <li><a href="https://pablomanso.com" target="_blank" rel="noreferrer">Pablo Manso</a></li>
      </ul>
    </>
  );
}
