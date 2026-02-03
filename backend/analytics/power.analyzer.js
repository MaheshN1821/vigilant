export function analyzePower(events) {
	const insights = [];

	if (events.some((e) => e.event_id === 105)) {
		insights.push({
			type: "POWER",
			message: "Your battery is fully charged.",
		});
	}

	const powerChanges = events.filter((e) => e.event_id === 506);
	if (powerChanges.length > 0) {
		insights.push({
			type: "POWER",
			message: "Power source changed recently (plugged/unplugged).",
		});
	}

	return insights;
}
