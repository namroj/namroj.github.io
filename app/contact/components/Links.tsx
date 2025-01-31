import { links } from '@/components/sidebar/links/Links';
import styles from './Links.module.scss';

export default function Links() {
  return (
    <div className={styles.links}>
      <ul>
        {links.map((link) => (
          <li key={link.title}>
            <a
              href={link.href}
              title={link.title}
              target="_blank"
              rel="noreferrer"
            >
              {link.icon} <span>{link.reduced_href}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
