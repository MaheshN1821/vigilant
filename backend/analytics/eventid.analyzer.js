export function analyzeEventIds(events) {
	const groupedEvents = events.reduce((acc, event) => {
		const id = event.event.event_id;

		if (!acc[id]) {
			acc[id] = {
				eventId: id,
				name: event.name,
				severity: event.severity,
				count: 0,
			};
		}

		acc[id].count++;
		return acc;
	}, {});

	// Convert to sorted array
	const results = Object.values(groupedEvents).sort(
		(a, b) => b.count - a.count,
	);

	return results;
}
