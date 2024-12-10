import React from 'react';
import {
  FaBootstrap,
  FaCss3Alt,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaLaravel,
  FaNodeJs,
  FaReact,
  FaSass,
  FaSymfony,
} from 'react-icons/fa';
import { RiNextjsFill } from 'react-icons/ri';
import { SiSpring, SiTypescript, SiPhp, SiAntdesign, SiTailwindcss } from 'react-icons/si';
import { IoLogoJavascript } from 'react-icons/io5';
import { BiBowlRice } from 'react-icons/bi';
import { GrMysql } from 'react-icons/gr';
import { DiJqueryLogo, DiPostgresql } from 'react-icons/di';
import TagItem, { Tag } from '@/components/ui/tag/TagItem';
import styles from './Skills.module.scss';

export default function Skills() {
  const skills: Tag[] = [
    {
      name: 'GIT',
      icon: <FaGitAlt />,
      url: 'https://git-scm.com/',
    },
    {
      name: 'Next.js',
      icon: <RiNextjsFill />,
      url: 'https://nextjs.org/',
    },
    {
      name: 'Java',
      icon: <FaJava />,
      url: 'https://www.java.com/',
    },
    {
      name: 'Spring',
      icon: <SiSpring />,
      url: 'https://spring.io/',
    },
    {
      name: 'JavaScript',
      icon: <IoLogoJavascript />,
      url: 'https://www.javascript.com/',
    },
    {
      name: 'JQuery',
      icon: <DiJqueryLogo />,
      url: 'https://brand.jquery.org/',
    },
    {
      name: 'TypeScript',
      icon: <SiTypescript />,
      url: 'https://www.typescriptlang.org//',
    },
    {
      name: 'Node.js',
      icon: <FaNodeJs />,
      url: 'https://nodejs.org/',
    },
    {
      name: 'React',
      icon: <FaReact />,
      url: 'https://react.dev/',
    },
    {
      name: 'Umi.js',
      icon: <BiBowlRice />,
      url: 'https://v3.umijs.org/',
    },
    {
      name: 'PHP',
      icon: <SiPhp />,
      url: 'https://www.php.net/',
    },
    {
      name: 'Symfony',
      icon: <FaSymfony />,
      url: 'https://symfony.com/',
    },
    {
      name: 'Laravel',
      icon: <FaLaravel />,
      url: 'https://laravel.com/',
    },
    {
      name: 'MySQL',
      icon: <GrMysql />,
      url: 'https://www.mysql.com/',
    },
    {
      name: 'PostgreSQL',
      icon: <DiPostgresql />,
      url: 'https://www.postgresql.org/',
    },
    {
      name: 'HTML',
      icon: <FaHtml5 />,
      url: 'https://www.w3.org/TR/html/',
    },
    {
      name: 'CSS',
      icon: <FaCss3Alt />,
      url: 'https://www.w3.org/Style/CSS/',
    },
    {
      name: 'SASS',
      icon: <FaSass />,
      url: 'https://sass-lang.com/',
    },
    {
      name: 'Ant Design',
      icon: <SiAntdesign />,
      url: 'https://ant.design/',
    },
    {
      name: 'Bootstrap',
      icon: <FaBootstrap />,
      url: 'https://getbootstrap.com/',
    },
    {
      name: 'Tailwind',
      icon: <SiTailwindcss />,
      url: 'https://tailwindcss.com/',
    },
  ];

  return (
    <ul className={styles.skills}>
      {skills.map(skill => (
        <TagItem item={skill} />
      ))}
    </ul>
  );
}