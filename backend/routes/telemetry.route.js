import express from "express";
import { ingestTelemetry } from "../services/telemetry.ingest.js";

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const { machine_id, telemetry } = req.body;

		if (!machine_id || !Array.isArray(telemetry)) {
			return res.status(400).json({ error: "Invalid payload" });
		}

		await ingestTelemetry(machine_id, telemetry);

		res.json({ status: "ok" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Ingestion failed" });
	}
});

export default router;
