import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();

  async function addMeetupHandler(enteredData) {
    await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta name="content" description="Add here your new meetup"/>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;
