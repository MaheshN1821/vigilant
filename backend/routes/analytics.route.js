import express from "express";
import { runAnalytics } from "../analytics/analytics.engine.js";

const router = express.Router();

router.get("/:machineId", async (req, res) => {
	const { machineId } = req.params;
	const window = Number(req.query.window || 60000); // default 1 min

	const result = await runAnalytics(machineId, window);

	res.json(result);
});

export default router;
