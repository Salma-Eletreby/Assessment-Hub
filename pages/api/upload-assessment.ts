import type { NextApiRequest, NextApiResponse } from "next";
import { chromium } from "playwright";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // we'll handle raw data manually
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    // 1️⃣ Read raw request body
    const chunks: Uint8Array[] = [];
    for await (const chunk of req) {
      chunks.push(chunk as Uint8Array);
    }
    const bodyBuffer = Buffer.concat(chunks);

    // 2️⃣ Parse JSON from buffer
    const bodyJson = JSON.parse(bodyBuffer.toString("utf-8"));
    let { html, fileName } = bodyJson;
    if (!html) return res.status(400).json({ message: "HTML content is required" });

    // 3️⃣ Read header image from public folder and convert to Base64
    const imagePath = path.join(process.cwd(), "public", "LogiscoolDocHeader.png");
    let imageBase64 = "";
    if (fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath);
      imageBase64 = imageBuffer.toString("base64");
    }

    // 4️⃣ Inject header image into HTML
    const htmlWithHeader = `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            /* Optional: add some basic styling or Tailwind here if needed */
          </style>
        </head>
        <body>
          ${imageBase64 ? `<div style="text-align:center; margin-bottom:-40px;">
            <img src="data:image/png;base64,${imageBase64}" style="max-width:100%; height:auto;" />
          </div>` : ""}
          ${html}
        </body>
      </html>
    `;

    // 5️⃣ Launch headless Chromium
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setContent(htmlWithHeader, { waitUntil: "networkidle" });

    // 6️⃣ Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
      scale: 0.65,
    });

    await browser.close();

    // 7️⃣ Upload to Dropbox
    const dropboxToken = process.env.DROPBOX_TOKEN;
    if (!dropboxToken) throw new Error("Dropbox token is missing!");

    const uploadFileName = fileName || `assessment-${Date.now()}.pdf`;

    const response = await fetch("https://content.dropboxapi.com/2/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${dropboxToken}`,
        "Content-Type": "application/octet-stream",
        "Dropbox-API-Arg": JSON.stringify({
          path: `/Assessments/${uploadFileName}`,
          mode: "add",
          autorename: true,
          mute: false,
        }),
      },
      body: new Uint8Array(pdfBuffer),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Dropbox upload failed: ${errText}`);
    }

    res.status(200).json({ message: "PDF generated and uploaded successfully!", fileName: uploadFileName });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}
