import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV || 'development' });
  });

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  // API Route for sending emails
  app.post("/api/send-email", async (req, res) => {
    const { to, subject, body } = req.body;

    if (!resend) {
      console.log("RESEND_API_KEY not found. Simulating email send.");
      return res.json({ success: true, simulated: true });
    }

    try {
      const { data, error } = await resend.emails.send({
        from: 'Crackers <onboarding@resend.dev>',
        to: [to],
        subject: subject,
        html: body.replace(/\n/g, '<br>'),
      });

      if (error) {
        console.error("Resend Error:", error);
        return res.status(400).json({ success: false, error });
      }

      res.json({ success: true, data });
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    console.log(`Starting in development mode (NODE_ENV=${process.env.NODE_ENV}) with Vite middleware...`);
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Catch-all for SPA in development
    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      console.log(`Development request for: ${url}`);
      try {
        // If it's an API route, let it pass (though they should be defined above)
        if (url.startsWith('/api/')) return next();
        
        // Read index.html from root
        let template = await fs.promises.readFile(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        
        // Transform it with Vite
        template = await vite.transformIndexHtml(url, template);
        
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        console.error(`Error transforming index.html for ${url}:`, e);
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    console.log("Starting in production mode...");
    const distPath = path.join(process.cwd(), 'dist');
    console.log(`Serving static files from: ${distPath}`);
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      console.log(`Production request for: ${req.originalUrl}`);
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
