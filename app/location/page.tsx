import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { Breadcrumb } from '@/providers/navigation/NavigationProvider';
import Breadcrumbs from '@/components/main/breadcrumbs/Breadcrumbs';
import { CiLocationArrow1 } from 'react-icons/ci';

export const metadata: Metadata = {
  title: 'Ubicación | Jorman Espinoza',
};

const MapWithNoSSR = dynamic(() => import('./components/GMap'), {
  ssr: true,
});

export default function ContactPage() {
  const breadcrumbs: Breadcrumb[] = [
    { label: 'Ubicación', href: '', icon: <CiLocationArrow1 /> },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <h2>Ubicación</h2>

      <p>Actualmente resido en Buenos Aires, Argentina.</p>

      <MapWithNoSSR />
    </>
  );
}
