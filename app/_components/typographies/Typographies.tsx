import favoriteFonts from './data.json';

type Typography = {
  name: string;
  author: {
    name: string;
    url: string;
  };
  url: string;
}

export default function Typographies() {
  const typographies: Typography[] = favoriteFonts;

  return <ul>
    {typographies.map(typo => (
      <li key={typo.name}>
        <a
          href={typo.url}
          target="_blank"
          rel="noreferrer"
        >
          {typo.name}
        </a>{' '}
        - por{' '}
        <a
          href={typo.author.url}
          target="_blank"
          rel="noreferrer"
        >
          {typo.author.name}
        </a>
        .
      </li>
    ))}
  </ul>;
}