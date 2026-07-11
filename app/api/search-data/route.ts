import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  const postsDirectory = path.join(process.cwd(), 'app/_posts');
  const postFiles = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
    postFiles.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      return {
        id: `post-${data.slug}`,
        title: data.title,
        type: 'post',
        slug: `/blog/${data.slug}`,
        content: content.slice(0, 5000), // Limit content size
      };
    })
  );

  const projectsFile = path.join(process.cwd(), 'app/projects/data.json');
  const projectsData = JSON.parse(await fs.readFile(projectsFile, 'utf8'));
  const projects = projectsData.map((project: any) => {
    const description = typeof project.description === 'object'
      ? `${project.description.en || ''} ${project.description.es || ''}`
      : project.description || '';

    return {
      id: `project-${project.name.toLowerCase().replace(/\s+/g, '-')}`,
      title: project.name,
      type: 'project',
      slug: '/projects/',
      content: description,
    };
  });

  return NextResponse.json([...posts, ...projects]);
}
