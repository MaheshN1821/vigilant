export function analyzeEvents(events) {
	const findings = [];

	const criticalEvents = events.filter(
		(e) => e.severity === "CRITICAL" || e.severity === "ERROR",
	);

	if (criticalEvents.length >= 3) {
		findings.push({
			type: "EVENT",
			severity: "CRITICAL",
			message: "Multiple critical system events detected",
			count: criticalEvents.length,
		});
	}

	const hardwareEvents = events.filter((e) => e.name === "hardware_event");

	if (hardwareEvents.length > 0) {
		findings.push({
			type: "HARDWARE",
			severity: "CRITICAL",
			message: "Hardware reliability warning",
		});
	}

	return findings;
}
