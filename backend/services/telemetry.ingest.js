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
			metricZSet.push({
				score: item.timestamp,
				member: JSON.stringify(item),
			});

			metricDocs.push({
				machineId,
				name: item.name,
				value: item.value,
				timestamp: item.timestamp,
			});
		}

		if (item.type === "EVENT") {
			eventZSet.push({
				score: item.timestamp,
				member: JSON.stringify(item),
			});

			eventDocs.push({
				machineId,
				name: item.name,
				severity: item.severity,
				source: item.event.source,
				eventId: item.event.event_id,
				fields: item.event.fields,
				timestamp: item.timestamp,
			});
		}
	}

	/* ---------- Redis (fast path) ---------- */
	if (metricZSet.length > 0) {
		await redis.zadd(metricKey, ...metricZSet);
		await redis.zremrangebyscore(metricKey, 0, now - 10 * 60 * 1000);
	}

	if (eventZSet.length > 0) {
		await redis.zadd(eventKey, ...eventZSet);
		await redis.zremrangebyscore(eventKey, 0, now - 10 * 60 * 1000);
	}

	/* ---------- MongoDB (durable storage) ---------- */
	if (metricDocs.length > 0) {
		await Metric.insertMany(metricDocs, { ordered: false });
	}

	if (eventDocs.length > 0) {
		await Event.insertMany(eventDocs, { ordered: false });
	}
}
