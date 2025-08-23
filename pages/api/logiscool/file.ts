// /pages/api/logiscool/file.ts
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;
  const filePath = path.join(process.cwd(), "public", "data", "logiscool", `${name}.json`);

  try {
    if (req.method === "GET") {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      res.status(200).json(JSON.parse(fileContent));
    } else if (req.method === "PUT") {
      const newData = req.body;
      fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), "utf-8");
      res.status(200).json({ message: "File saved successfully" });
    } else {
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read or write file" });
  }
}
