import redis from "../config/redis.js";

export async function fetchWindow(machineId, type, windowMs) {
	const key = `telemetry:${machineId}:${type}`;
	const now = Date.now();
	const from = now - windowMs;

	const results = await redis.zrange(key, from, now, { byScore: true });

	console.log(results);

	return results.map(JSON.parse);
}

export async function fetchPrevWindow(machineId, type, startMs, endMs) {
	const now = Date.now();
	const key = `telemetry:${machineId}:${type}`;

	const raw = await redis.zrange(key, now - endMs, now - startMs, {
		byScore: true,
	});

	return raw.map(JSON.parse);
}
