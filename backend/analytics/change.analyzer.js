export function analyzeChanges(recentEvents, previousEvents) {
	const countById = (events) => {
		const map = {};
		for (const e of events) {
			if (!e.event_id) continue;
			map[e.event_id] = (map[e.event_id] || 0) + 1;
		}
		return map;
	};

	const recent = countById(recentEvents);
	const previous = countById(previousEvents);

	const changes = [];

	for (const eventId of Object.keys(recent)) {
		const before = previous[eventId] || 0;
		const now = recent[eventId];

		if (now > before) {
			changes.push({
				event_id: Number(eventId),
				previous: before,
				current: now,
				delta: now - before,
			});
		}
	}

	return changes;
}
