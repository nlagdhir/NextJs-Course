import path from 'path';
import fs from 'fs/promises';
import { Fragment } from "react";

const EventIdPage = (props) => {
    const {loadedEvent} = props;

    if(!loadedEvent){
        return <p>Loading...</p>
    }

  return (
    <Fragment>
      <h1>{loadedEvent.title}</h1>
      <p>{loadedEvent.description}</p>
      
    </Fragment>
  );
};

export default EventIdPage;

const getData = async() => {
    const filePath = path.join(process.cwd(),'data','dummy-events.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return data;
}

export const getStaticProps = async (context) => {
    const {params} = context;
    const eventId = params.eid;

    const data = await getData();

    const event = data.events.find((event) => event.id === eventId);

    if(!event){
        return {
            notFound : true
        }
    }

    return {
        props : {
            loadedEvent : event,
        },
    };
    
}

export const getStaticPaths = async() => {
    const data = await getData();

    const paramsWithIDs = data.events.map(event => ({params : {eid : event.id}}));

    return {
        paths: paramsWithIDs,
        fallback : true,
    }
}
