import Head from "next/head"
import { Fragment } from "react";
import getmeetupsCollection from "./api/requests";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Welcome to Meetups</title>
        <meta name="content" description="A place were people with same interest come together"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const response = await getmeetupsCollection();
  const meetupsCollection = response.collection;
  const meetups = await meetupsCollection.find().toArray();

  response.client.close();

  const meetupList = meetups.map((meetup) => ({
    id: meetup._id.toString(),
    title: meetup.title,
    image: meetup.image,
    address: meetup.address,
  }));

  return {
    props: {
      meetups: meetupList,
    },
    revalidate: 1,
  };
}

export default HomePage;
