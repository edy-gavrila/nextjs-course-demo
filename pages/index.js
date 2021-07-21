import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking oportunities!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

/* export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;
  //fetchData from API
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}
 */
export async function getStaticProps() {
  //fetch data from server
  const client = await MongoClient.connect(
    "mongodb+srv://edy_gavrila:edyroxy12@cluster0.ytpiu.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
