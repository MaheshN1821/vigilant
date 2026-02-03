export function analyzeMetrics(metrics) {
	const findings = [];

	const cpu = metrics.filter((m) => m.name === "cpu_usage");
	const memory = metrics.filter((m) => m.name === "memory_used");

	if (cpu.length > 0) {
		const avgCpu =
			cpu.reduce((a, b) => a + parseFloat(b.value), 0) / cpu.length;

		if (avgCpu > 85) {
			findings.push({
				type: "CPU",
				severity: "CRITICAL",
				message: "Sustained high CPU usage",
				value: avgCpu,
			});
		} else if (avgCpu > 65) {
			findings.push({
				type: "CPU",
				severity: "WARNING",
				message: "Elevated CPU usage",
				value: avgCpu,
			});
		}
	}

	if (memory.length > 0) {
		const avgMem =
			memory.reduce((a, b) => a + parseFloat(b.value), 0) / memory.length;

		if (avgMem > 80) {
			findings.push({
				type: "MEMORY",
				severity: "CRITICAL",
				message: "Memory exhaustion risk",
				value: avgMem,
			});
		}
	}

	return findings;
}
