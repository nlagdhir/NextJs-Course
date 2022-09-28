import fs from "fs";
import path from "path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export const getPostMeta = (postIdentifier) => {
  const postSlug = postIdentifier.replace(/\.md$/, ""); //removes the file extension
  const filepath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filepath, "utf-8");

  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
};

export const getPostsFiles = () => {
    return fs.readdirSync(postsDirectory);
}

export const getAllPosts = () => {
  const postFiles = getPostsFiles()

  // for(const postFile of postFiles) {
  //     const postData = getPostMeta(postFile);
  // }

  const allPosts = postFiles.map((postFile) => {
    return getPostMeta(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
};
