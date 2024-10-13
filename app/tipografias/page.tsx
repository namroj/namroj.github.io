import { Metadata } from 'next';
import Breadcrumbs, {
  Breadcrumb,
} from '@/components/main/breadcrumbs/Breadcrumbs';
import { RxFontFamily } from 'react-icons/rx';

export const metadata: Metadata = {
  title: 'Tipografías preferidas | Jorman Espinoza',
};

export default function FontsPage() {
  const breadcrumbs: Breadcrumb[] = [
    { label: 'Tipografías', icon: <RxFontFamily /> },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <h2>Tipografías preferidas</h2>
      <ul>
        <li>
          <a
            href="https://philpl.gumroad.com/l/dank-mono"
            target="_blank"
            rel="noreferrer"
          >
            Dank Mono
          </a>{' '}
          - by{' '}
          <a href="https://philpl.gumroad.com" target="_blank" rel="noreferrer">
            Phil Pluckthun
          </a>
        </li>
        <li>
          <a
            href="https://www.jetbrains.com/es-es/lp/mono"
            target="_blank"
            rel="noreferrer"
          >
            JetBrains Mono
          </a>{' '}
          - by{' '}
          <a href="https://www.jetbrains.com/" target="_blank" rel="noreferrer">
            JetBrains
          </a>
        </li>
        <li>
          <a
            href="https://learn.microsoft.com/es-es/windows/terminal/cascadia-code#cascadia-code-versions"
            target="_blank"
            rel="noreferrer"
          >
            Cascadia Code
          </a>{' '}
          - by{' '}
          <a
            href="https://www.microsoft.com/es-ar"
            target="_blank"
            rel="noreferrer"
          >
            Microsoft
          </a>
        </li>
        <li>
          <a
            href="https://github.com/tonsky/FiraCode/blob/master/LEEME.md"
            target="_blank"
            rel="noreferrer"
          >
            Fira Code
          </a>{' '}
          - by{' '}
          <a href="https://github.com/tonsky" target="_blank" rel="noreferrer">
            Nikita Prokopov [tonsky]
          </a>
        </li>
      </ul>
      {/* Fragment end */}
    </>
  );
}
