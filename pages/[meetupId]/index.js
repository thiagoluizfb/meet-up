import { ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import getmeetupsCollection from "../api/requests";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="content" description={props.meetupData.description} />
      </Head>
      <MeetupDetail
        id={props.meetupData.id}
        title={props.meetupData.title}
        src={props.meetupData.src}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const response = await getmeetupsCollection();
  const meetups = await response.collection.find({}, { _id: 1 }).toArray();

  response.client.close();

  const pathsId = meetups.map((meetup) => ({
    params: { meetupId: meetup._id.toString() },
  }));

  return {
    fallback: 'blocking',
    paths: pathsId,
  };
}

export async function getStaticProps(context) {
  const meetupId = await context.params.meetupId;
  const response = await getmeetupsCollection();
  const meetup = await response.collection.findOne({ _id: ObjectId(meetupId) });

  response.client.close();
  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        src: meetup.image,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}

export default MeetupPage;
