import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";

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

