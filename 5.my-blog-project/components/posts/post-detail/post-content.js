import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import {Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { adomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
 
import classes from "./post-content.module.css";

const PostContent = (props) => {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderes = {
    // img(image) {
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },

    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },

    code(code) {
      const { className, children } = code;
      const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
      return <SyntaxHighlighter language={language} style={adomDark}>
      {children }
    </SyntaxHighlighter>
    }
    
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderes}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
