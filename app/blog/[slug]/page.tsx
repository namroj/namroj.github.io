import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import DarkItalic from '@/assets/themes/dark-italic-color-theme.json';
import NightOwlLight from '@/assets/themes/night-owl-light-color-theme.json';
import { Breadcrumb } from '@/providers/navigation/NavigationProvider';
import Breadcrumbs from '@/components/main/breadcrumbs/Breadcrumbs';
import ToC from '@/components/ui/toc/ToC';
import { extractHeadings, getPosts } from '@/utils/posts';
import { FaKeyboard } from 'react-icons/fa6';
import { LuFileTerminal } from 'react-icons/lu';
import styles from './page.module.scss';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const getMarkDownFileData = async (slug: string) => {
  try {
    const filePath = path.join(process.cwd(), 'app/_posts', `${slug}.mdx`);
    const file = await readFile(filePath, 'utf8');
    return matter(file);
  } catch {
    return notFound();
  }
};

const prettyCodeOptions = {
  theme: {
    dark: DarkItalic,
    light: NightOwlLight,
  },
};

export default async function PostPage({ params }: Readonly<Props>) {
  const { slug } = await params;

  if (!slug) {
    return notFound();
  }

  const { content, data } = await getMarkDownFileData(slug);
  const headings = extractHeadings(content);

  const breadcrumbs: Breadcrumb[] = [
    { label: 'Blog', href: '/blog/', icon: <FaKeyboard /> },
    { label: data.title as string, icon: <LuFileTerminal /> },
  ];

  return (
    <article className={styles.article}>
      <Breadcrumbs items={breadcrumbs} />

      <div className={styles.content}>
        <aside className={styles.aside}>
          <ToC headings={headings} />
        </aside>

        <div className={styles.markdown}>
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                useDynamicImport: false,
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypePrettyCode as never, prettyCodeOptions],
                  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                ],
              },
            }}
          />
        </div>
      </div>
    </article>
  );
}

export async function generateMetadata({ params }: Readonly<Props>) {
  const { slug } = await params;
  const { data } = await getMarkDownFileData(slug);

  return {
    title: `${data.title} | Jorman Espinoza`,
    description: data.summary as string,
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
