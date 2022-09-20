import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data";

const HomePage = () => {

  const featuredEvents = getFeaturedEvents();

  return <section>
      <h1 className="center title">Feature Events</h1>
      <EventList items={featuredEvents} />
  </section>
}

export default HomePage;