import Head from "next/head";
import { useEffect, useState } from "react";
import EventList from "../components/events/event-list";
import useSWR from "swr";
import { getFeaturedEvents } from "../helpers/api.util";
import NewsLetterRegistration from '../components/input/newsletter-registration';

const HomePage = (props) => {
  const [featuredEvents, setFeaturedEvents] = useState(props.featuredEvents);

  // Fetch using useSWR
  const { data, error } = useSWR(
    "https://nextjs-course-f6a92-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  // Use useEffect to prepare proper data for featuredEvents
  useEffect(() => {
    const eventsData = [];
    for (let key in data) {
      if (data[key].isFeatured) {
        eventsData.push({
          id: key,
          ...data[key],
        });
      }

      setFeaturedEvents(eventsData);
    }
  }, [data]);

  if (!data) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error is there while fetching data</p>;
  }

  // Using Fetch API

  // useEffect(() => {
  //   fetch("https://nextjs-course-f6a92-default-rtdb.firebaseio.com/events.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const eventsData = [];
  //       for (let key in data) {
  //         if (data[key].isFeatured) {
  //           eventsData.push({
  //             id: key,
  //             title: data[key].title,
  //             description: data[key].description,
  //             location: data[key].location,
  //             date: data[key].date,
  //             isFeatured: data[key].isFeatured,
  //             image: data[key].image,
  //           });
  //         }
  //       }
  //       setFeaturedEvents(eventsData);
  //     });
  // }, []);

  // if (!featuredEvents) {
  //   return <p>Loading...</p>;
  // }

  // if (featuredEvents.length === 0) {
  //   return <p className="center">No Featured Events Found!</p>;
  // }

  //const featuredEvents = getFeaturedEvents();

  //console.log(featuredEvents);

  return (
    <section>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>

      <h1 className="center title">Feature Events</h1>
      <NewsLetterRegistration />
      <EventList items={props.featuredEvents} />
    </section>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const eventsData = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: eventsData,
    },
    revalidate: 1800,
  };
};
