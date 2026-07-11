import { Metadata } from 'next';
import { getPosts, PostMetaData } from '@/utils/posts';
import { Breadcrumb } from '@/providers/navigation/NavigationProvider';
import Breadcrumbs from '@/components/main/breadcrumbs/Breadcrumbs';
import Posts from '@/app/blog/components/Posts';
import { FaKeyboard } from 'react-icons/fa6';

export const metadata: Metadata = {
  title: 'Blog | Jorman Espinoza',
};

export default async function BlogPage() {
  const breadcrumbs: Breadcrumb[] = [{ label: 'Blog', icon: <FaKeyboard /> }];
  const posts: PostMetaData[] = await getPosts('es');
  const visiblePosts = posts.filter((p) => p.visible);
  const allTags = Array.from(new Set(visiblePosts.flatMap((post) => post.tags))).sort();
  const initialPosts = visiblePosts.slice(0, 10);

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <h2>Blog</h2>

      <Posts posts={initialPosts} allTags={allTags} />
    </>
  );
}