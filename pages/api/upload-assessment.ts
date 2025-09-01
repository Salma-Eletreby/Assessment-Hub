import type { NextApiRequest, NextApiResponse } from "next";
import { Dropbox } from "dropbox";
import fetch from "node-fetch";
import fs from "fs";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getAccessTokenFromRefreshToken() {
  const response = await fetch("https://api.dropbox.com/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.DROPBOX_REFRESH_TOKEN!,
      client_id: process.env.DROPBOX_CLIENT_ID!,
      client_secret: process.env.DROPBOX_CLIENT_SECRET!,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to get access token: ${errText}`);
  }

  const data = await response.json();
  return data.access_token as string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const form = formidable({ multiples: false, maxFileSize: 10 * 1024 * 1024 });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        return res.status(500).json({ message: "Failed to parse uploaded file" });
      }

      const rawFile = files.file;
      if (!rawFile) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const file: formidable.File = Array.isArray(rawFile) ? rawFile[0] : rawFile;
      if (!file.filepath) {
        return res.status(400).json({ message: "Invalid file uploaded" });
      }

      const fileBuffer = await fs.promises.readFile(file.filepath);
      const fileName = file.originalFilename || `assessment-${Date.now()}.pdf`;

      const accessToken = await getAccessTokenFromRefreshToken();
      const dbx = new Dropbox({ accessToken, fetch });

      await dbx.filesUpload({
        path: `/Assessments/${fileName}`,
        contents: fileBuffer,
        mode: { ".tag": "add" },
        autorename: true,
        mute: false,
      });

      res.status(200).json({ message: "PDF uploaded successfully!", fileName });
    });
  } catch (err: any) {
    console.error("Upload assessment error:", err);
    res.status(500).json({ message: err.message || "Internal server error" });
  }
}
