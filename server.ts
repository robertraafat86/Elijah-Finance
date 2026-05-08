import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for contact form
  app.post("/api/contact", async (req, res) => {
    const { name, phone, service } = req.body;

    try {
      const sheetId = process.env.GOOGLE_SHEET_ID;
      const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

      if (!sheetId || !serviceAccountEmail || !privateKey) {
        console.warn("Google Sheets credentials not fully configured. Logging to console instead.");
        console.log("Contact Form Submission:", { name, phone, service, date: new Date().toLocaleString() });
        return res.status(200).json({ success: true, message: "Logged to console (API not configured)" });
      }

      const serviceAccountAuth = new JWT({
        email: serviceAccountEmail,
        key: privateKey,
        scopes: [
          "https://www.googleapis.com/auth/spreadsheets",
          "https://www.googleapis.com/auth/drive.readonly"
        ],
      });

      const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];

      await sheet.addRow({
        الاسم: name,
        الهاتف: phone,
        الخدمة: service,
        التاريخ: new Date().toLocaleString("ar-EG"),
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error saving to Google Sheets:", error);
      res.status(500).json({ success: false, error: "Failed to save data" });
    }
  });

  // API route for Google Drive images
  app.get("/api/drive-images", async (req, res) => {
    try {
      const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
      const FOLDER_ID = "1hBrB9rq0VAtH-zAm137K19eJK5i4d_HI";

      if (!serviceAccountEmail || !privateKey) {
        return res.status(200).json({ files: [] }); // Safe fallback
      }

      const auth = new JWT({
        email: serviceAccountEmail,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      });

      const response = await auth.request({
        url: `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'image/'&fields=files(id,name,mimeType)&pageSize=1000`,
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching Google Drive files:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
