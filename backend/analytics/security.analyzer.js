export function analyzeSecurity(events) {
	const failedLogins = events.filter((e) => e?.event?.event_id === 4625);

	if (failedLogins.length === 0) return { message: "No Security Events Recorded" };

	return {
		type: "SECURITY",
		message: `There were ${failedLogins.length} failed login attempts recently.`,
		recommendation: "If this wasn't you, consider changing your password.",
		count: failedLogins.length,
	};
}
