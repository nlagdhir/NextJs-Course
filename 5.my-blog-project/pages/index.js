import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/post-util";

const DUMMY_POSTS = [
  {
    slug: "getting-started-with-nextjs",
    title: "Gettting Started with NextJS",
    image: "getting-started-with-nextjs.png",
    excerpt:
      "NextJS is a the React Framework for production - it makes building fullstack react apps and sites a breeze and ships with built-in SSR",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextjs2",
    title: "Gettting Started with NextJS",
    image: "getting-started-with-nextjs.png",
    excerpt:
      "NextJS is a the React Framework for production - it makes building fullstack react apps and sites a breeze and ships with built-in SSR",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextjs3",
    title: "Gettting Started with NextJS",
    image: "getting-started-with-nextjs.png",
    excerpt:
      "NextJS is a the React Framework for production - it makes building fullstack react apps and sites a breeze and ships with built-in SSR",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextjs4",
    title: "Gettting Started with NextJS",
    image: "getting-started-with-nextjs.png",
    excerpt:
      "NextJS is a the React Framework for production - it makes building fullstack react apps and sites a breeze and ships with built-in SSR",
    date: "2022-02-10",
  },
];

const HomePage = (props) => {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
};

export default HomePage;

export const getStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    }
  };
};
