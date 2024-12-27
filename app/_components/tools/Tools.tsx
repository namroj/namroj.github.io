import React from 'react';
import { SiDbeaver, SiIntellijidea, SiPostman } from 'react-icons/si';
import { VscVscodeInsiders } from 'react-icons/vsc';
import { RiTerminalBoxFill } from 'react-icons/ri';
import { FaAws, FaBitbucket, FaFigma, FaGithub, FaJira } from 'react-icons/fa';
import { BsFillDiagram2Fill } from 'react-icons/bs';
import { DiIllustrator } from 'react-icons/di';
import TagItem from '@/components/ui/tag/TagItem';
import styles from './Tools.module.scss';

interface Tool {
  name: string;
  icon: React.ReactNode;
  url: string;
}

export default function Tools() {
  const tools: Tool[] = [
    {
      name: 'IntelliJ IDEA',
      icon: <SiIntellijidea />,
      url: 'https://www.jetbrains.com/idea/',
    },
    {
      name: 'VS Code',
      icon: <VscVscodeInsiders />,
      url: 'https://code.visualstudio.com/',
    },
    {
      name: 'Terminal',
      icon: <RiTerminalBoxFill />,
      url: 'https://ohmyz.sh/',
    },
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/',
    },
    {
      name: 'Bitbucket',
      icon: <FaBitbucket />,
      url: 'https://bitbucket.org/',
    },
    {
      name: 'Postman',
      icon: <SiPostman />,
      url: 'https://www.postman.com/',
    },
    {
      name: 'DBeaver',
      icon: <SiDbeaver />,
      url: 'https://dbeaver.io/',
    },
    {
      name: 'Draw.io',
      icon: <BsFillDiagram2Fill />,
      url: 'https://draw.io/',
    },
    {
      name: 'Jira',
      icon: <FaJira />,
      url: 'https://www.atlassian.com/es/software/jira/',
    },
    {
      name: 'AWS',
      icon: <FaAws />,
      url: 'https://aws.amazon.com/',
    },
    {
      name: 'Illustrator',
      icon: <DiIllustrator />,
      url: 'https://www.adobe.com/ar/products/illustrator.html',
    },
    {
      name: 'Figma',
      icon: <FaFigma />,
      url: 'https://www.figma.com/',
    },
  ];

  return (
    <ul className={styles.tools}>
      {tools.map(tool => <TagItem item={tool} />)}
    </ul>
  );
}