import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export type PostMetaData = {
  title: string;
  date: string;
  summary: string;
  slug: string;
  tags: string[];
  cover_image: string;
  visible: boolean;
};

/**
 * Retrieves metadata for all posts within a specified directory for a specific language.
 *
 * This function reads all files in the '_posts' directory, filters them by language suffix,
 * extracts metadata such as title, date, summary, slug, tags, and cover image from each
 * file's content, and returns an array of post metadata objects sorted in descending order by date.
 *
 * @param {string} lang The language code (e.g., 'es', 'en'). Defaults to 'es'.
 * @return {Promise<PostMetaData[]>} A promise that resolves to an array of post metadata objects, sorted by date in descending order.
 */
export async function getPosts(lang: string = 'es'): Promise<PostMetaData[]> {
  const postsDirectory = path.join(process.cwd(), 'app/_posts');
  const filenames = await fs.readdir(postsDirectory);

  const filteredFilenames = filenames.filter((filename) =>
    filename.endsWith(`.${lang}.mdx`),
  );

  const posts = await Promise.all(
    filteredFilenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContents);

      const postMetaData: PostMetaData = {
        title: data.title as string,
        date: data.date as string,
        summary: data.summary as string,
        slug: data.slug as string,
        tags: data.tags as string[],
        cover_image: data.cover_image as string,
        visible: data.visible as boolean,
      };

      return postMetaData;
    }),
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export interface Heading {
  level: number;
  text: string;
  id: string;
}

export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-\u00C0-\u017F]/g, '');
    headings.push({ level, text, id });
  }

  return headings;
}
