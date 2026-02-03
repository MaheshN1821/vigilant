import { fetchWindow } from "./window.fetcher.js";
import { analyzeMetrics } from "./metric.analyzer.js";
import { analyzeEvents } from "./event.analyzer.js";
import { analyzeEventIds } from "./eventid.analyzer.js";
import { analyzeChanges } from "./change.analyzer.js";
import { analyzeSecurity } from "./security.analyzer.js";
import { analyzePower } from "./power.analyzer.js";

export async function runAnalytics(machineId, windowMs) {
	const metrics = await fetchWindow(machineId, "metrics", windowMs);
	const events = await fetchWindow(machineId, "events", windowMs);

	const last5Min = await fetchWindow(machineId, "events", 5 * 60 * 1000);
	const prev5Min = await fetchWindow(
		machineId,
		"events",
		10 * 60 * 1000,
		5 * 60 * 1000,
	);

	return {
		windowMs,
		metricsFindings: analyzeMetrics(metrics),
		eventFindings: analyzeEvents(events),
		eventIdInsights: analyzeEventIds(events),
		changes: analyzeChanges(last5Min, prev5Min),
		security: analyzeSecurity(last5Min),
		power: analyzePower(last5Min),
	};
}
