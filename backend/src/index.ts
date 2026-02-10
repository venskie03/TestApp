import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import geminiRoutes from "./routes/gemini/gemini.ts";
import userRoutes from "./routes/user/user.ts";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const API_PATH = "/api/v1";

app.use(`${API_PATH}/gemini`, geminiRoutes);
app.use(`${API_PATH}/user`, userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`🚀 Server running at ${port}`);
});
