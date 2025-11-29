import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import mongoDb from "./libs/db";

const app: Application = express();

app.use(express.json());


mongoDb();

import authRoutes from "./routes/authRoute";

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    time: new Date().toISOString(),
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running...");
});

app.use("/api/auth", authRoutes);


const port: number = parseInt(process.env.PORT || "5000", 10);

const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";

// Start server
app.listen(port, host, () => {
  console.log(`🚀 Server running on http://${host}:${port}`);
});
