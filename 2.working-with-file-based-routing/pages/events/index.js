import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getAllEvents } from "../../helpers/api.util";

const AllEventsPage = (props) => {
  
  const { events  } = props;  
  
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEventsPage;

export const getStaticProps = async () => {
  const events = await getAllEvents();
  console.log(events);
  return {
    props : {
      events : events
    },
    revalidate : 60
  }
}
