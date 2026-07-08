import { ReactNode } from 'react';
import TagItem, { Tag } from '@/components/ui/tag/TagItem';
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
import {
  SiSpring,
  SiTypescript,
  SiPhp,
  SiAntdesign,
  SiTailwindcss,
} from 'react-icons/si';
import { IoLogoJavascript } from 'react-icons/io5';
import { BiBowlRice } from 'react-icons/bi';
import { GrMysql } from 'react-icons/gr';
import { DiJqueryLogo, DiPostgresql } from 'react-icons/di';
import readJsonFile from '@/utils/files';
import styles from './Skills.module.scss';

const iconMap: Record<string, ReactNode> = {
  FaGitAlt: <FaGitAlt />,
  RiNextjsFill: <RiNextjsFill />,
  FaJava: <FaJava />,
  SiSpring: <SiSpring />,
  IoLogoJavascript: <IoLogoJavascript />,
  DiJqueryLogo: <DiJqueryLogo />,
  SiTypescript: <SiTypescript />,
  FaNodeJs: <FaNodeJs />,
  FaReact: <FaReact />,
  BiBowlRice: <BiBowlRice />,
  SiPhp: <SiPhp />,
  FaSymfony: <FaSymfony />,
  FaLaravel: <FaLaravel />,
  GrMysql: <GrMysql />,
  DiPostgresql: <DiPostgresql />,
  FaHtml5: <FaHtml5 />,
  FaCss3Alt: <FaCss3Alt />,
  FaSass: <FaSass />,
  SiAntdesign: <SiAntdesign />,
  FaBootstrap: <FaBootstrap />,
  SiTailwindcss: <SiTailwindcss />,
};

interface SkillData {
  name: string;
  icon: string;
  url: string;
}

export default async function Skills() {
  const data = (await readJsonFile(
    'app/_components/skills',
    'data.json',
  )) as SkillData[];

  const skills: Tag[] = data.map(item => ({
    ...item,
    icon: iconMap[item.icon] || <span>{item.name}</span>,
  }));

  return (
    <ul className={styles.skills}>
      {skills.map(skill => (
        <TagItem key={skill.name} item={skill} />
      ))}
    </ul>
  );
}