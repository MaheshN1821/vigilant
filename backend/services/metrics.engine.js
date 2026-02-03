export function processAnalytics(metrics, windowMs) {
	const findings = [];
	const summary = { cpu: {}, memory: {}, disk: {} };
	const chartMap = {};

	// 1. Group by timestamp for synchronized charts
	metrics.forEach((m) => {
		if (!chartMap[m.timestamp]) {
			chartMap[m.timestamp] = {
				time: new Date(m.timestamp).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				}),
				timestamp: m.timestamp,
			};
		}
		const val = parseFloat(m.value.toString().replace(/[^\d.-]/g, ""));
		if (m.name === "cpu_usage") chartMap[m.timestamp].cpu = val;
		if (m.name === "memory_used") chartMap[m.timestamp].mem = val;
		if (m.name === "disk_io_latency") chartMap[m.timestamp].disk = val;
		if (m.name === "top_process_memory") chartMap[m.timestamp].topApp = val;
	});

	const charts = Object.values(chartMap).sort(
		(a, b) => a.timestamp - b.timestamp,
	);

	// 2. Derive Insights (Findings)
	const getAvg = (name) => {
		const data = metrics.filter((m) => m.name === name);
		return data.length
			? data.reduce((a, b) => a + parseFloat(b.value), 0) / data.length
			: 0;
	};

	summary.cpu.avg = getAvg("cpu_usage");
	summary.memory.avg = getAvg("memory_used");
	summary.disk.avg = getAvg("disk_io_latency");

	if (summary.cpu.avg > 80)
		findings.push({
			type: "CPU",
			severity: "CRITICAL",
			message: "High CPU detected",
		});
	if (summary.memory.avg > 85)
		findings.push({
			type: "MEM",
			severity: "WARNING",
			message: "Memory pressure high",
		});

	return {
		summary,
		findings,
		charts: windowMs > 600000 ? downsample(charts, 5) : charts, // Downsample if window > 10m
	};
}

function downsample(data, factor) {
	return data.filter((_, i) => i % factor === 0);
}
