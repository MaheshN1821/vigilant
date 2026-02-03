import express from "express";
import dotenv from "dotenv";
import telemetryRoute from "./routes/telemetry.route.js";
import analyticsRoute from "./routes/analytics.route.js";

import { connectMongo } from "./config/mongo.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "5mb" }));

app.use("/api/telemetry", telemetryRoute);
app.use("/api/analytics", analyticsRoute);

//Analytic endpoints to call
// GET /api/analytics/<machineId>?window=30000
// GET /api/analytics/<machineId>?window=60000
// GET /api/analytics/<machineId>?window=300000

const PORT = process.env.PORT || 3000;

await connectMongo();

app.listen(PORT, () => {
	console.log(`Backend listening on port ${PORT}`);
});

// import express from "express";
// import bodyParser from "body-parser";

// const app = express();
// app.use(bodyParser.json({ limit: "5mb" }));

// app.post("/api/telemetry", (req, res) => {
// 	console.log("Telemetry received:");
// 	// console.log(req.body);
// 	console.log(JSON.stringify(req.body, null, 2));
// 	res.send({ status: "ok" });
// });

// app.listen(3000, () => {
// 	console.log("Backend listening on port 3000");
// });
