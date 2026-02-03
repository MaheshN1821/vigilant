import redis from "../config/redis.js";
import { Metric } from "../models/Metric.js";
import { Event } from "../models/Event.js";

export async function ingestTelemetry(machineId, telemetryArray) {
	const now = Date.now();
	const metricKey = `telemetry:${machineId}:metrics`;
	const eventKey = `telemetry:${machineId}:events`;

	const metricZSet = [];
	const eventZSet = [];
	const metricDocs = [];
	const eventDocs = [];

	for (const item of telemetryArray) {
		if (item.type === "METRIC") {
			// Push as an object, which Upstash likes best
			metricZSet.push({ score: item.timestamp, member: item });

			metricDocs.push({
				machineId,
				name: item.name,
				value: item.value,
				timestamp: item.timestamp,
			});
		} else if (item.type === "EVENT") {
			eventZSet.push({ score: item.timestamp, member: item });

			eventDocs.push({
				machineId,
				name: item.name,
				severity: item.severity,
				source: item.event?.source,
				eventId: item.event?.event_id,
				fields: item.event?.fields,
				timestamp: item.timestamp,
			});
		}
	}

	const tasks = [];
	/* ---------- Redis ---------- */
	const p = redis.pipeline();

	if (metricZSet.length > 0) {
		p.zadd(
			metricKey,
			...metricZSet.map((i) => ({ score: i.score, member: i.member })),
		);
		// p.zremrangebyscore(metricKey, 0, now - 10 * 60 * 1000);
	}

	if (eventZSet.length > 0) {
		p.zadd(
			eventKey,
			...eventZSet.map((i) => ({ score: i.score, member: i.member })),
		);
		// p.zremrangebyscore(eventKey, 0, now - 10 * 60 * 1000);
	}

	const results = await p.exec();
	console.log("Pipeline Results:", results);

	/* ---------- MongoDB ---------- */
	if (metricDocs.length > 0) {
		tasks.push(Metric.insertMany(metricDocs, { ordered: false }));
	}
	if (eventDocs.length > 0) {
		tasks.push(Event.insertMany(eventDocs, { ordered: false }));
	}

	await Promise.all(tasks);
}

