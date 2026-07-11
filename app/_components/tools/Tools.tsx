import { ReactNode } from 'react';
import { AiFillSlackCircle, AiFillOpenAI } from "react-icons/ai";
import { SiDbeaver, SiClaudecode, SiIntellijidea, SiPostman, SiJetbrains } from 'react-icons/si';
import { VscVscodeInsiders } from 'react-icons/vsc';
import { RiNotionFill, RiTerminalBoxFill } from 'react-icons/ri';
import { FaAws, FaBitbucket, FaFigma, FaGithub, FaJira, FaTrello } from 'react-icons/fa';
import { BsFillDiagram2Fill } from 'react-icons/bs';
import { DiIllustrator } from 'react-icons/di';
import TagItem from '@/components/ui/tag/TagItem';
import data from './data.json';
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
  FaTrello: <FaTrello />,
  RiNotionFill: <RiNotionFill />,
  AiFillSlackCircle: <AiFillSlackCircle />,
  SiJetbrains: <SiJetbrains />,
  SiClaudecode: <SiClaudecode />,
  AiFillOpenAI: <AiFillOpenAI />,
};

interface ToolData {
  name: string;
  icon: string;
  url: string;
}

export default function Tools() {
  const tools = (data as ToolData[]).map(item => ({
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