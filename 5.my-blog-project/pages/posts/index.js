import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/post-util";

const AllPostsPage = (props) => {
    console.log(props.posts);
  return <AllPosts posts={props.posts} />;
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
