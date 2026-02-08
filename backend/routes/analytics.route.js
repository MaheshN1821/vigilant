import express from "express";
import { Event } from "../models/Event.js";
import { runAnalytics } from "../analytics/analytics.engine.js";

const router = express.Router();

router.get("/:machineId", async (req, res) => {
	try {
		const { machineId } = req.params;

		// Check if machineId exists in DB
		const machineExists = await Event.findOne({ machineId }).lean();
		if (!machineExists) {
			return res
				.status(404)
				.json({ error: "No Logs found for this machine-id" });
		}

		const window = Number(req.query.window || 60000); // default 1 min
		if (window < 1000 || window > 7200000) {
			// 1 sec min, 2 hour max
			return res
				.status(400)
				.json({ error: "Window must be 1s-2hr (1000-7200000ms)" });
		}
		const result = await runAnalytics(machineId, window);
		return res.status(200).json(result);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error" });
	}
});

export default router;
