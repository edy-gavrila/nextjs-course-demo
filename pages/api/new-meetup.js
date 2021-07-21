// /api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log("Received data...",data);
    const client = await MongoClient.connect(
      "mongodb+srv://edy_gavrila:edyroxy12@cluster0.ytpiu.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log("Inserted document...",result);
    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
