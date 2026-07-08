import { ReactNode } from 'react';
import { SiDbeaver, SiIntellijidea, SiPostman } from 'react-icons/si';
import { VscVscodeInsiders } from 'react-icons/vsc';
import { RiTerminalBoxFill } from 'react-icons/ri';
import { FaAws, FaBitbucket, FaFigma, FaGithub, FaJira } from 'react-icons/fa';
import { BsFillDiagram2Fill } from 'react-icons/bs';
import { DiIllustrator } from 'react-icons/di';
import TagItem from '@/components/ui/tag/TagItem';
import readJsonFile from '@/utils/files';
import styles from './Tools.module.scss';

const iconMap: Record<string, ReactNode> = {
  SiIntellijidea: <SiIntellijidea />,
  VscVscodeInsiders: <VscVscodeInsiders />,
  RiTerminalBoxFill: <RiTerminalBoxFill />,
  FaGithub: <FaGithub />,
  FaBitbucket: <FaBitbucket />,
  SiPostman: <SiPostman />,
  SiDbeaver: <SiDbeaver />,
  BsFillDiagram2Fill: <BsFillDiagram2Fill />,
  FaJira: <FaJira />,
  FaAws: <FaAws />,
  DiIllustrator: <DiIllustrator />,
  FaFigma: <FaFigma />,
};

interface ToolData {
  name: string;
  icon: string;
  url: string;
}

export default async function Tools() {
  const data = (await readJsonFile(
    'app/_components/tools',
    'data.json',
  )) as ToolData[];

  const tools = data.map(item => ({
    ...item,
    icon: iconMap[item.icon] || <span>{item.name}</span>,
  }));

  return (
    <ul className={styles.tools}>
      {tools.map(tool => (
        <TagItem key={tool.name} item={tool} />
      ))}
    </ul>
  );
}