import redis from "../config/redis.js";

export async function fetchWindow(machineId, type, windowMs) {
	const now = Date.now();
	const key = `telemetry:${machineId}:${type}`;

	const raw = await redis.zrangebyscore(key, now - windowMs, now);

	return raw.map(JSON.parse);
}

export async function fetchPrevWindow(machineId, type, startMs, endMs) {
    const now = Date.now();
    const key = `telemetry:${machineId}:${type}`;

    // Custom time range: startMs to endMs ago
    const raw = await redis.zrangebyscore(key, now - endMs, now - startMs);
    return raw.map(JSON.parse);
}
