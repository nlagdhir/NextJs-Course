import fs from "fs/promises";
import path from "path";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps = async () => {
  console.log("Re-)Generating...");
  const filepath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filepath);
  const data = JSON.parse(jsonData);

  // When we did not received data or error to connect in database then we can redirect user to specific path
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  // When we do not have data then we can display 404 page with true parameter in notFound
  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
    notFound: false,
  };
};


export default HomePage;
