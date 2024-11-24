import { Metadata } from 'next';

import { Breadcrumb } from '@/providers/navigation/NavigationProvider';
import Breadcrumbs from '@/components/main/breadcrumbs/Breadcrumbs';

import { LuMessagesSquare } from 'react-icons/lu';
import Links from '@/app/contact/components/Links';


export const metadata: Metadata = {
  title: 'Contacto | Jorman Espinoza',
};

export default function ContactPage() {
  const breadcrumbs: Breadcrumb[] = [
    { label: 'Contacto', href: '', icon: <LuMessagesSquare /> },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <h2>Contacto</h2>

      <Links />
    </>
  );
}
