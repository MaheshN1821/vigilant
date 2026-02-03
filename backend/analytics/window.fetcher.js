import redis from "../config/redis.js";

export async function fetchWindow(machineId, type, windowMs) {
	const now = Date.now();
	const key = `telemetry:${machineId}:${type}`;

	const raw = await redis.zrangebyscore(key, now - windowMs, now);

	return raw.map(JSON.parse);
}
