import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { readFile } from "fs/promises";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypePrettyCode from "rehype-pretty-code";

import Breadcrumbs, {
  Breadcrumb,
} from "@/app/_components/main/breadcrumbs/breadcrumbs";

import { FaKeyboard } from "react-icons/fa6";
import { LuFileTerminal } from "react-icons/lu";

interface PostProps {
  params: {
    slug: string;
  };
}

const getMarkDownFileData = async (slug: string) => {
  try {
    const file = await readFile(`./app/_posts/${slug}.mdx`, "utf8");
    return matter(file);
  } catch (error) {
    console.error(error);
    return notFound();
  }
};

export default async function Post({ params }: Readonly<PostProps>) {
  if (params?.slug === undefined) {
    return notFound();
  }

  const postComponents = {};

  const { content, data } = await getMarkDownFileData(params.slug);

  const breadcrumbs: Breadcrumb[] = [
    { label: "Blog", href: "/blog", icon: <FaKeyboard /> },
    { label: data.title, icon: <LuFileTerminal /> },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <MDXRemote
        source={content}
        components={{ ...postComponents }}
        options={{
          mdxOptions: {
            useDynamicImport: true,
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypePrettyCode,
                {
                  theme: {
                    dark: "min-dark",
                    light: "min-light",
                  },
                },
              ],
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
              rehypeHighlight,
            ],
          },
        }}
      />
    </>
  );
}

export async function generateMetadata({ params }: Readonly<PostProps>) {
  const { data } = await getMarkDownFileData(params.slug);

  return {
    title: `${data.title} | Jorman Espinoza`,
    description: data.summary,
  };
}
