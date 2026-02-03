import express from "express";
import { ingestTelemetry } from "../services/telemetry.ingest.js";

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const { machine_id, telemetry } = req.body;

		if (!machine_id || !Array.isArray(telemetry)) {
			return res.status(400).json({ error: "Invalid payload" });
		}

		const result = await ingestTelemetry(machine_id, telemetry);

		return res.status(201).json({ status: "ok", info: result });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Ingestion failed" });
	}
});

export default router;
