import { useRouter } from "next/router";
import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helpers/api.util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

const EventDetailPage = (props) => {

  const {event} = props;

  if (!event) {
    return (
      <Fragment>
        <div className="center">
          <p>Loading...</p>
        </div>
      </Fragment>
    );
  }

  //console.log(event);
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>{event.description}</EventContent>
    </Fragment>
  );
};

export default EventDetailPage;

export const getStaticProps = async(context) => {
  const {params } = context;
  const eventId = params.eventId;
  //console.log(eventId);
  const event = await getEventById(eventId);

  return {
    props : {
      event : event
    },
    revalidate : 30
  }
}

export const getStaticPaths = async () => {

  const events = await getFeaturedEvents();

  const paths = events.map(event => ({params : {eventId : event.id}}));

  return {
    paths : paths,
    fallback: 'blocking'
  }
}
