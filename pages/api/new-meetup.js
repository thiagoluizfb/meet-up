import getmeetupsCollection from "./requests";

async function handler(req, res) {

  if (req.method === "POST") {
    const data = req.body;
    const request = await getmeetupsCollection();

    await request.collection.insertOne(data);
    request.client.close();
    res.status(201).json({ message: "Meetup has been inserted" });
  }
}

export default handler;
