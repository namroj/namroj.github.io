import { MetadataRoute } from 'next';
import { getPosts } from './_utils/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const baseUrl = 'https://jorman.dev';

  const blogPosts = posts
    .filter((post) => post.visible)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    }));

  const routes = ['', '/blog', '/projects', '/experience', '/formation', '/contact'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })
  );

  return [...routes, ...blogPosts];
}
