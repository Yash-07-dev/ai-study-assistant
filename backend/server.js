
import express from "express";
import cors from "cors";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

// Existing test route
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "AI Study Assistant backend is running!",
  });
});

// Gemini chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body ?? {};

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Please enter a valid message.",
      });
    }

    if (!ai) {
      return res.status(500).json({
        error: "Gemini API key is not configured.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message.trim(),
    });

    const reply = response.text;

    if (!reply) {
      return res.status(502).json({
        error: "Gemini returned an empty response.",
      });
    }

    return res.json({ reply });
  } catch (error) {
    console.error("Gemini request failed:", error.message);

    return res.status(502).json({
      error: "Unable to generate a response. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
