import { ReactNode } from 'react';

import { IoLogoGithub } from 'react-icons/io5';
import { FaXTwitter, FaThreads } from 'react-icons/fa6';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { PiButterfly } from 'react-icons/pi';
import styles from './Links.module.scss';

interface NetworkLink {
  href: string;
  title: string;
  icon: ReactNode;
}

export const links: NetworkLink[] = [
  {
    href: 'https://github.com/namroj',
    title: 'GitHub',
    icon: <IoLogoGithub />,
  },
  {
    href: 'https://www.linkedin.com/in/jormanespinoza',
    title: 'LinkedIn',
    icon: <FaLinkedinIn />,
  },
  {
    href: 'https://twitter.com/jormandev',
    title: 'Twitter',
    icon: <FaXTwitter />,
  },
  {
    href: 'https://instagram.com/jorman.dev',
    title: 'Instagram',
    icon: <FaInstagram />,
  },
  {
    href: 'https://www.threads.net/@jorman.dev',
    title: 'Threads',
    icon: <FaThreads />,
  },
  {
    href: 'https://bsky.app/profile/jormandev.bsky.social',
    title: 'Bluesky',
    icon: <PiButterfly />,
  },
];

export default function Links() {
  return (
    <ul className={styles.links}>
      {links.map((link) => (
        <li className={styles.link} key={link.title}>
          <a
            href={link.href}
            title={link.title}
            target="_blank"
            rel="noreferrer"
          >
            {link.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
