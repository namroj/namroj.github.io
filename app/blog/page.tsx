import { Metadata } from 'next';
import { Link } from 'next-view-transitions';

import getPosts, { PostMetaData } from '@/utils/posts';
import { Breadcrumb } from '@/providers/navigation/NavigationProvider';
import Breadcrumbs from '@/components/main/breadcrumbs/Breadcrumbs';
import { FaKeyboard } from 'react-icons/fa6';
import styles from './page.module.scss';

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

      <div className={styles.posts}>
        {posts.map((post) => (
          <div key={post.slug}>
            <div className={styles.post}>
              <Link
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'underline', fontSize: 'italic' }}
              >
                {post.title}
              </Link>
              <br />
              <span style={{ color: 'gray' }}>{post.summary}</span>
              <br />
              <span>{post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
