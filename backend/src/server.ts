import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import geminiRoutes from "./routes/gemini/gemini.ts";


const app = express();

app.use(cors());
app.use(express.json());

const API_PATH = "/api/v1";
app.use(`${API_PATH}/gemini`, geminiRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export const handler = serverless(app);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Local server running at http://localhost:${PORT}`);
  });
}
