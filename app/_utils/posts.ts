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
};

/**
 * Retrieves metadata for all posts within a specified directory.
 *
 * This function reads all files in the '_posts' directory, extracts metadata such as title,
 * date, summary, slug, tags, and cover image from each file's content, and returns an array
 * of post metadata objects sorted in descending order by date.
 *
 * @return {Promise<PostMetaData[]>} A promise that resolves to an array of post metadata objects, sorted by date in descending order.
 */
export async function getPosts(): Promise<PostMetaData[]> {
  const postsDirectory = path.join(process.cwd(), 'app/_posts');
  const filenames = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
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
      };

      return postMetaData;
    }),
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}