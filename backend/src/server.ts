import express from "express";
import cors from "cors";
import http from "http";
import geminiRoutes from "./routes/gemini/gemini.ts";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const API_PATH = "/api/v1";

app.use(`${API_PATH}/gemini`, geminiRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
