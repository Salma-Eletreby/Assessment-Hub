// /pages/api/logiscool/db.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
  }
  return client.db(process.env.MONGODB_DB);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query; // example: ?name=camps

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'name' query parameter" });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection(name);

    if (req.method === "GET") {
      // read everything
      const data = await collection.find({}).toArray();
      res.status(200).json(data);

    } else if (req.method === "PUT") {
      // overwrite the collection with new data
      const newData = req.body;

      if (!Array.isArray(newData)) {
        return res.status(400).json({ error: "PUT body must be an array of documents" });
      }

      // delete old data
      await collection.deleteMany({});
      // insert new data
      await collection.insertMany(newData);

      res.status(200).json({ message: "Collection updated successfully" });

    } else {
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.error("MongoDB API error:", err);
    res.status(500).json({ error: "Failed to read or write collection" });
  }
}
