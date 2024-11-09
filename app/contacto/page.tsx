import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { Breadcrumb } from '@/providers/navigation/NavigationProvider';
import Breadcrumbs from '@/components/main/breadcrumbs/Breadcrumbs';

import { LuMessagesSquare } from 'react-icons/lu';

export const metadata: Metadata = {
  title: 'Contacto | Jorman Espinoza',
};

const MapWithNoSSR = dynamic(() => import('./components/GMap'), {
  ssr: true,
});

export default function ContactPage() {
  const breadcrumbs: Breadcrumb[] = [
    { label: 'Contacto', href: '', icon: <LuMessagesSquare /> },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <h2>Contacto</h2>

      <p>
        <a
          href="mailto:espinoza.dev@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          espinoza.dev@gmail.com
        </a>
      </p>

      <p>Actualmente resido en Buenos Aires, Argentina.</p>

      <MapWithNoSSR />
    </>
  );
}
