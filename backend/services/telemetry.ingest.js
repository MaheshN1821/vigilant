import redis from "../config/redis.js";
import { Metric } from "../models/Metric.js";
import { Event } from "../models/Event.js";

export async function ingestTelemetry(machineId, telemetryArray) {
	const now = Date.now();

	for (const item of telemetryArray) {
		// ---------- METRIC ----------
		if (item.type === "METRIC") {
			const redisKey = `telemetry:${machineId}:metrics`;

			// Redis window insert (sorted by timestamp)
			await redis.zadd(redisKey, [item.timestamp, JSON.stringify(item)]);

			// Keep last 10 minutes only
			await redis.zremrangebyscore(redisKey, 0, now - 10 * 60 * 1000);

			// Persist to Mongo
			const result = await Metric.create({
				machineId,
				name: item.name,
				value: item.value,
				timestamp: item.timestamp,
			});

			console.log(result);
		}

		// ---------- EVENT ----------
		if (item.type === "EVENT") {
			const redisKey = `telemetry:${machineId}:events`;

			await redis.zadd(redisKey, [item.timestamp, JSON.stringify(item)]);

			await redis.zremrangebyscore(redisKey, 0, now - 10 * 60 * 1000);

			await Event.create({
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
}
