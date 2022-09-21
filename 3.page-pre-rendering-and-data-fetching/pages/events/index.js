import { Fragment } from "react";
import Link from "next/link";

const EventPage = (props) => {
  const { events } = props;
  return (
    <Fragment>
      <h1>Event List Page</h1>
      <ul>
        {events.map((event) => (
          <Link href={`/events/${event.id}`}>
            <li key={event.id}>{event.title}</li>
          </Link>
        ))}
      </ul>
    </Fragment>
  );
};

export default EventPage;

export const getStaticProps = async () => {
  return {
    props: {
      events: [
        {
          id: 1,
          title: "Event 1",
        },
        {
          id: 2,
          title: "Event 2",
        },
      ],
    },
  };
};
