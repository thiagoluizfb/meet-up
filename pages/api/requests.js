import { MongoClient } from "mongodb";

const getmeetupsCollection = async () => {
    const client = await MongoClient.connect(
      "mongodb+srv://ThiagoLFB:JnOCKr08Eu0TBegh@myfirstcluster.1cfbf.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const collection = db.collection("meetups");

    return {
      client,
      collection,
    };
  };

export default getmeetupsCollection;
