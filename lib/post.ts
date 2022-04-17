import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";
import { remark } from 'remark';
import html from 'remark-html';

const workDir = process.cwd();
const postsDir = path.join(workDir, "posts");

export async function getSortedPostsData() {
  const dirLists = await fs.readdir(postsDir);
  const allPostsData = await Promise.all(
    dirLists
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDir, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
          id,
          ...matterResult.data
        }
      })
  );

  return (allPostsData as IAllPostsData).sort((a, b) => a.date - b.date);
}

export async function getAllPostIds() {
  const dirLists = await fs.readdir(postsDir);
  return dirLists
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDir, `${id}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
