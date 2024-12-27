import { Metadata } from 'next';
import getPosts, { PostMetaData } from '@/utils/posts';
import { Breadcrumb } from '@/providers/navigation/NavigationProvider';
import Breadcrumbs from '@/components/main/breadcrumbs/Breadcrumbs';
import Posts from '@/app/blog/components/Posts';
import { FaKeyboard } from 'react-icons/fa6';

export const metadata: Metadata = {
  title: 'Blog | Jorman Espinoza',
};

export default async function BlogPage() {
  const breadcrumbs: Breadcrumb[] = [{ label: 'Blog', icon: <FaKeyboard /> }];
  const posts: PostMetaData[] = await getPosts();

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <h2>Blog</h2>

      <Posts posts={posts} />
    </>
  );
}