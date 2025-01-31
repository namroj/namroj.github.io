import { Metadata } from 'next';
import readJsonFile from '@/utils/files';
import { Breadcrumb } from '@/providers/navigation/NavigationProvider';
import Breadcrumbs from '@/components/main/breadcrumbs/Breadcrumbs';
import { ImBooks } from 'react-icons/im';
import Formation from '@/app/formation/components/Formation';
import { FormationItemType } from './components/FormationItem';

export const metadata: Metadata = {
  title: 'Formación | Jorman Espinoza',
};

export default async function FormationPage() {
  const breadcrumbs: Breadcrumb[] = [{ label: 'Formación', icon: <ImBooks /> }];

  const formation = (await readJsonFile('app/formation', 'data.json')) as
    | FormationItemType[]
    | [];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <h2>Formación</h2>

      <p>
        Registro de mi formación académica y profesional.
        <br />
        Por supuesto, existen otras fuentes de las cuales he adquirido
        conocimientos, tales como:
      </p>

      <ul>
        <li>YouTube</li>
        <li>Libros</li>
        <li>Blogs</li>
        <li>Documentación oficial/de terceros</li>
        <li>Proyectos laborales/personales</li>
      </ul>

      <Formation data={formation} />
    </>
  );
}
