import { Metadata } from 'next';
import { Link } from 'next-view-transitions';

import { Breadcrumb } from '@/providers/navigation/NavigationProvider';
import Breadcrumbs from '@/components/main/breadcrumbs/Breadcrumbs';
import { FaKeyboard } from 'react-icons/fa6';

export const metadata: Metadata = {
  title: 'Blog | Jorman Espinoza',
};

export default function BlogPage() {
  const breadcrumbs: Breadcrumb[] = [{ label: 'Blog', icon: <FaKeyboard /> }];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <h2>Blog</h2>

      <br />
      
      <Link
        href="/blog/prueba"
        style={{ textDecoration: 'underline', fontSize: 'italic' }}
      >
        Prueba
      </Link>
      <br />
      <Link
        href="/blog/domingos"
        style={{ textDecoration: 'underline', fontSize: 'italic' }}
      >
        Domingos
      </Link>
    </>
  );
}
