import { fetchWindow } from "./window.fetcher.js";
import { analyzeEventIds } from "./eventid.analyzer.js";
import { analyzeSecurity } from "./security.analyzer.js";
import { analyzePower } from "./power.analyzer.js";

export async function runAnalytics(machineId, windowMs) {
	const events = await fetchWindow(machineId, "events", windowMs);

	const last15Min = await fetchWindow(machineId, "events", 15 * 60 * 1000);

	return {
		machineId,
		eventIdInsights: analyzeEventIds(events),
		security: analyzeSecurity(events),
		power: analyzePower(last15Min),
	};
}
