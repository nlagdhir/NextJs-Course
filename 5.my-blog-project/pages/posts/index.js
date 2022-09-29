import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/post-util";

const AllPostsPage = (props) => {
  console.log(props.posts);
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programing and development posts"
        />
      </Head>
      <AllPosts posts={props.posts} />;
    </>
  );
};

export default AllPostsPage;

export const getStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
};
