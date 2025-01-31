import fonts from './data.json';

type Typography = {
  name: string;
  author: {
    name: string;
    url: string;
  };
  url: string;
}

export default function Typographies() {
  const favoriteFonts: Typography[] = fonts;

  return <ul>
    {favoriteFonts.map(font => (
      <li key={font.name}>
        <a
          href={font.url}
          target="_blank"
          rel="noreferrer"
        >
          {font.name}
        </a>{' '}
        - por{' '}
        <a
          href={font.author.url}
          target="_blank"
          rel="noreferrer"
        >
          {font.author.name}
        </a>.
      </li>
    ))}
  </ul>;
}