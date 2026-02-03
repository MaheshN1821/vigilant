import redis from "../config/redis.js";
import { Metric } from "../models/Metric.js";
import { processAnalytics } from "../services/metrics.engine.js";
import express from "express";

const router = express.Router();

router.get("/:machineId", async (req, res) => {
	try {
		const { machineId } = req.params;

		const machineExists = await Metric.findOne({ machineId }).lean();
		if (!machineExists) {
			return res.status(404).json({ error: "Machine not found" });
		}

		const windowMs = parseInt(req.query.window) || 60000; // Default 1 min
		if (windowMs < 1000 || windowMs > 7200000) {
			// 1 sec min, 2 hour max
			return res
				.status(400)
				.json({ error: "Window must be 1s-2hr (1000-7200000ms)" });
		}

		const now = Date.now();
		const from = now - windowMs;

		let rawData = [];

		// If window is within Redis range (e.g., <= 30 mins), use Redis for speed
		if (windowMs <= 1800000) {
			rawData = await redis.zrange(
				`telemetry:${machineId}:metrics`,
				from,
				now,
				{
					byScore: true,
				},
			);
		} else {
			// Otherwise, fetch from MongoDB (Up to 2-hour limit)
			rawData = await Metric.find({
				machineId,
				timestamp: { $gte: from, $lte: now },
			}).lean();
		}

		const processed = processAnalytics(rawData, windowMs);
		return res.status(200).json({ machineId, ...processed });
	} catch (error) {
		return res.status(500).json({ error: "Internal server error" });
	}
});

export default router;
