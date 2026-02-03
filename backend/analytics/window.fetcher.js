import redis from "../config/redis.js";

export async function fetchWindow(machineId, type, windowMs) {
	const key = `telemetry:${machineId}:${type}`;
	const now = Date.now();
	const from = now - windowMs;

	const results = await redis.zrange(key, from, now, { byScore: true });

	const afo = Array.from(results);
	return afo;
}
