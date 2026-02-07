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
			return res
				.status(404)
				.json({ error: "No Logs found for this machine-id" });
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

		rawData = await Metric.find({
			machineId,
			receivedAt: { $gte: from, $lte: now },
		}).lean();

		if (rawData.length === 0) {
			const latestRecord = await Metric.findOne({ machineId }).sort({
				receivedAt: -1,
			});
			if (latestRecord) {
				const lastArrival = latestRecord.receivedAt;
				rawData = await Metric.find({
					machineId,
					receivedAt: { $gte: lastArrival - 60000, $lte: lastArrival },
				}).lean();
			}
		}

		const processed = processAnalytics(rawData, windowMs);
		return res.status(200).json({ machineId, ...processed });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error" });
	}
});

export default router;
