import express from "express";
import dotenv from "dotenv";
import telemetryRoute from "./routes/telemetry.route.js";
import analyticsRoute from "./routes/analytics.route.js";
import cors from "cors";
import { connectMongo } from "./config/mongo.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.use("/api/telemetry", telemetryRoute);
app.use("/api/analytics", analyticsRoute);

//Analytic endpoints to call
// GET /api/analytics/<machineId>?window=30000
// GET /api/analytics/<machineId>?window=60000
// GET /api/analytics/<machineId>?window=300000

const PORT = process.env.PORT || 3000;

await connectMongo();

// app.listen(PORT, () => {
// 	console.log(`Backend listening on port ${PORT}`);
// });

export default app;
