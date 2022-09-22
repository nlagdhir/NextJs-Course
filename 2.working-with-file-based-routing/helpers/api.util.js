export const getAllEvents = async () => {
  const response = await fetch(
    "https://nextjs-course-f6a92-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const eventsData = [];

  for (let key in data) {
    eventsData.push({
      id: key,
      ...data[key],
    });
  }
  return eventsData;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (eventId) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === eventId);
};

export const getFilteredEvents = async (dateFilter) => {
  const allEvents = await getAllEvents();
  const { year, month } = dateFilter;

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
