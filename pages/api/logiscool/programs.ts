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
  try {
    const db = await connectToDatabase();
    const { type } = req.query;

    if (!type || typeof type !== "string") {
      return res.status(400).json({ error: "Missing or invalid 'type' query parameter" });
    }

    let collectionName: string;

    switch (type.toLowerCase()) {
      case "camps":
        collectionName = "LogiscoolCamps";
        break;
      case "courses":
        collectionName = "courses";
        break;
      case "workshops":
        collectionName = "workshops";
        break;
      default:
        return res.status(400).json({ error: `Unknown type: ${type}` });
    }

    const collection = db.collection(collectionName);
    const programs = await collection.find({}).toArray();

    res.status(200).json(programs);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Failed to fetch programs" });
  }
}