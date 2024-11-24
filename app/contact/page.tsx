import { Metadata } from 'next';

import { Breadcrumb } from '@/providers/navigation/NavigationProvider';
import Breadcrumbs from '@/components/main/breadcrumbs/Breadcrumbs';

import { LuMessagesSquare } from 'react-icons/lu';
import { MdEmail } from 'react-icons/md';
import { links } from '@/components/sidebar/links/Links';

import styles from './page.module.scss';

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

      <div className={styles.contact}>
        <ul>
          <li key="email">
            <a
              href="mailto:espinoza.dev@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <MdEmail /> <span>espinoza.dev@gmail.com</span>
            </a>
          </li>

          {links.map((link) => (
            <li key={link.title}>
              <a
                href={link.href}
                title={link.title}
                target="_blank"
                rel="noreferrer"
              >
                {link.icon} <span>{link.href}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
