import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

const LastSales = (props) => {
  const [sales, setSales] = useState(props.sales);
  //   const [loading, setLoading] = useState(true);

  const { data, error } = useSWR(
    "https://nextjs-course-f6a92-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     fetch("https://nextjs-course-f6a92-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transformedSales);
  //         setLoading(false);
  //       });
  //   }, []);.

  if (error) {
    return <p>Faield to load</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>Loading...</p>;
  }

  console.log(sales);

  return (
    <Fragment>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            {sale.username} - {sale.volume}
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default LastSales;

export const getStaticProps = async () => {
  return fetch(
    "https://nextjs-course-f6a92-default-rtdb.firebaseio.com/sales.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      return { props: { sales: transformedSales } };
    });
};
