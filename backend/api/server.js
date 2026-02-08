import express from "express";
import dotenv from "dotenv";
import telemetryRoute from "../routes/telemetry.route.js";
import analyticsRoute from "../routes/analytics.route.js";
import metricRoute from "../routes/metric.route.js";
import eventRoute from "../routes/event.route.js";
import authRoute from "../routes/auth.route.js";
import eventAnalysisRoute from "../routes/eventAnalysis.route.js";
import mailRoute from "../routes/mail.route.js";
import cors from "cors";
import { connectMongo } from "../config/mongo.js";

dotenv.config();

const app = express();

const corsOptions = {
	origin: "https://vigilant-cyberx.vercel.app",
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
	maxAge: 86400,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "5mb" }));

app.use("/api/auth", authRoute);
app.use("/api/telemetry", telemetryRoute);
app.use("/api/analytics", analyticsRoute);
app.use("/api/configure/machine-id", authRoute);
app.use("/api/analytics/metrics", metricRoute);
app.use("/api/analytics/events", eventRoute);
app.use("/api/ai/", eventAnalysisRoute);
app.use("/api/alerts", mailRoute);

app.get("/", (req, res) => {
	return res.status(200).json({ message: "Backend is running!" });
});

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

// https://vigilant-api-server.vercel.app/
