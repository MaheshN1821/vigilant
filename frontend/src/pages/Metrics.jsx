import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	LineChart,
	Line,
	ComposedChart,
	Bar,
	BarChart,
	Legend,
	ReferenceLine,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Radar,
} from "recharts";
import {
	Cpu,
	HardDrive,
	Zap,
	Clock,
	RefreshCcw,
	TrendingUp,
	TrendingDown,
	AlertCircle,
	CheckCircle2,
} from "lucide-react";
import api from "../lib/api.js";
import { useNavigate } from "react-router-dom";

export default function Metrics() {
	const [data, setData] = useState(null);
	const [window, setWindow] = useState(300000);
	const [loading, setLoading] = useState(true);
	const [lastUpdated, setLastUpdated] = useState(new Date());
	const [isAutoRefreshing, setIsAutoRefreshing] = useState(true);

	const machineId = localStorage.getItem("vigilant-machineId");
	const Navigate = useNavigate();

	useEffect(() => {
		if (!machineId) {
			return Navigate("/auth");
		}
	}, []);

	const fetchData = async (timeWindow = window) => {
		try {
			const res = await api.get(
				`/api/analytics/metrics/${machineId}?window=${timeWindow}`,
			);
			// console.log(timeWindow, res.data);

			setData(res?.data);
			setLastUpdated(new Date());
		} catch (err) {
			// console.error("Failed to fetch metrics", err);
		}
	};

	// Initial fetch
	useEffect(() => {
		fetchData();
	}, [window, machineId]);

	// Auto-refresh every 60 seconds
	useEffect(() => {
		if (!isAutoRefreshing) return;

		const interval = setInterval(() => {
			fetchData();
		}, 60000); // 60 seconds

		return () => clearInterval(interval);
	}, [isAutoRefreshing, window, machineId]);

	// Dynamic data sampling based on time window
	const getChartData = () => {
		if (!data?.charts) return [];

		let charts = [...data.charts];
		let samplingRate = 1;

		// Determine sampling rate based on data points and window
		if (charts.length > 100) {
			samplingRate = Math.ceil(charts.length / 100);
		}

		return charts
			.filter((_, idx) => idx % samplingRate === 0)
			.map((item, idx) => ({
				...item,
				index: idx,
			}));
	};

	const chartData = getChartData();

	if (loading && !data) {
		return (
			<div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex items-center justify-center">
				<motion.div
					animate={{ opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 2, repeat: Infinity }}
					className="text-center"
				>
					<div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-indigo-600 animate-spin mx-auto mb-4"></div>
					<p className="text-slate-700 font-medium">
						Loading system metrics...
					</p>
				</motion.div>
			</div>
		);
	}

	const metricsCard = (title, value, unit, icon, gradient, status) => ({
		title,
		value,
		unit,
		icon,
		gradient,
		status,
	});

	const metrics = [
		metricsCard(
			"CPU Usage",
			data?.summary?.cpu?.avg.toFixed(1),
			"%",
			<Cpu className="w-6 h-6" />,
			"from-emerald-50 to-emerald-100",
			data?.summary?.cpu?.avg > 80
				? "high"
				: data?.summary?.cpu?.avg > 50
					? "medium"
					: "low",
		),
		metricsCard(
			"Memory Usage",
			data?.summary?.memory?.avg.toFixed(1),
			"%",
			<Zap className="w-6 h-6" />,
			"from-sky-50 to-sky-100",
			data?.summary?.memory?.avg > 80
				? "high"
				: data?.summary?.memory?.avg > 50
					? "medium"
					: "low",
		),
		metricsCard(
			"Disk Latency",
			data?.summary?.disk?.avg.toFixed(2),
			"ms",
			<HardDrive className="w-6 h-6" />,
			"from-violet-50 to-violet-100",
			"normal",
		),
	];

	const timeWindows = [
		// { label: "30s", val: 30000 },
		{ label: "1m", val: 60000 },
		{ label: "5m", val: 300000 },
		{ label: "10m", val: 600000 },
		{ label: "1h", val: 3600000 },
		{ label: "2h", val: 7200000 },
	];

	const StatusIcon = ({ status }) => {
		if (status === "high")
			return <AlertCircle className="w-4 h-4 text-rose-500" />;
		if (status === "medium")
			return <TrendingUp className="w-4 h-4 text-amber-500" />;
		return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
			{/* Header Section */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="sticky top-0 z-10 bg-white/85 backdrop-blur-lg border-b border-blue-100"
			>
				<div className="max-w-7xl mx-auto px-6 py-8">
					<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
						<div className="space-y-2">
							<h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
								{/* <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-200 to-blue-100 border-2 border-indigo-300 flex items-center justify-center">
									<Cpu className="w-6 h-6 text-indigo-700" />
								</div> */}
								System Metrics
							</h1>
							{/* <p className="text-slate-600 text-sm">
								Real-time performance analysis for{" "}
								<span className="font-semibold text-slate-900">
									{machineId?.slice(0, 8)}...
								</span>
							</p> */}
						</div>

						<div className="flex items-center gap-3">
							<div className="text-right text-sm">
								<p className="text-slate-600">Last updated</p>
								<p className="font-semibold text-slate-900">
									{lastUpdated.toLocaleTimeString()}
								</p>
							</div>
							<motion.button
								whileHover={{ rotate: 180 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => fetchData(window)}
								className="p-3 rounded-lg bg-indigo-200 hover:bg-indigo-300 text-indigo-700 transition-colors"
							>
								<RefreshCcw size={18} />
							</motion.button>
						</div>
					</div>

					{/* Time Window Selector */}
					<div className="mt-6 flex flex-wrap gap-2 items-center">
						{timeWindows.map((t) => (
							<motion.button
								key={t.val}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setWindow(t.val)}
								className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
									window === t.val
										? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg"
										: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
								}`}
							>
								{t.label}
							</motion.button>
						))}
						<div className="flex items-center gap-2 ml-auto px-3 py-2 bg-emerald-100 border border-emerald-300 rounded-lg">
							<div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></div>
							<span className="text-xs font-semibold text-emerald-700">
								Auto-refresh: ON
							</span>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
				{/* Summary Cards */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="grid grid-cols-1 md:grid-cols-3 gap-6"
				>
					{metrics.map((metric, idx) => {
						const gradientMap = {
							0: "from-blue-100 to-blue-50 border-blue-300 text-blue-900",
							1: "from-purple-100 to-purple-50 border-purple-300 text-purple-900",
							2: "from-orange-100 to-orange-50 border-orange-300 text-orange-900",
						};
						return (
							<motion.div
								key={idx}
								whileHover={{ translateY: -8, scale: 1.02 }}
								transition={{ duration: 0.3 }}
								className={`bg-gradient-to-br ${gradientMap[idx]} border-2 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all`}
							>
								<div className="flex items-start justify-between mb-6">
									<div className="space-y-1">
										<p className="text-sm font-semibold opacity-75 uppercase tracking-wide">
											{metric.title}
										</p>
										<div className="flex items-baseline gap-1">
											<span className="text-4xl font-bold">{metric.value}</span>
											<span className="text-xl font-semibold opacity-70">
												{metric.unit}
											</span>
										</div>
									</div>
									<div className="p-3 bg-white/50 rounded-lg">
										{metric.icon}
									</div>
								</div>
								<div className="flex items-center justify-end gap-2">
									<StatusIcon status={metric.status} />
									<span className="text-md font-medium opacity-75 capitalize">
										{metric.status === "high"
											? "High usage"
											: metric.status === "medium"
												? "Moderate"
												: "Healthy"}
									</span>
								</div>
							</motion.div>
						);
					})}
				</motion.div>

				{/* Charts Section */}
				<div className="space-y-8">
					{/* CPU Performance - Area + Line Chart */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="bg-white border-2 border-blue-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
					>
						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
							<div className="flex items-center gap-3">
								<div className="p-3 bg-gradient-to-br from-blue-200 to-blue-100 rounded-lg">
									<Cpu className="w-5 h-5 text-blue-700" />
								</div>
								<div>
									<h3 className="text-xl font-bold text-slate-900">
										CPU Utilization Trend
									</h3>
									<p className="text-sm text-slate-600">
										Processor load analysis with trend visualization
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2 px-4 py-2 bg-blue-100 border-2 border-blue-300 rounded-lg">
								<TrendingUp className="w-4 h-4 text-blue-700" />
								<span className="text-sm font-bold text-blue-800">
									Avg: {data?.summary?.cpu?.avg.toFixed(1)}%
								</span>
							</div>
						</div>
						<ResponsiveContainer width="100%" height={380}>
							<LineChart
								data={chartData}
								margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#f1f5f9"
									vertical={false}
								/>

								<XAxis
									dataKey="time"
									stroke="#3179dd"
									fontSize={12}
									tickLine={false}
									dy={10}
								/>
								<YAxis
									stroke="#3179dd"
									fontSize={12}
									domain={[0, 100]}
									tickLine={false}
									tickFormatter={(value) => `${value}%`}
								/>

								<Tooltip
									contentStyle={{
										backgroundColor: "#ffffff",
										border: "1px solid #e2e8f0",
										borderRadius: "8px",
										boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
									}}
									formatter={(value) => [`${value?.toFixed(1)}%`, "CPU"]}
									labelStyle={{ color: "#1e40af", fontWeight: "bold" }}
								/>

								<ReferenceLine
									y={80}
									stroke="#ef4444"
									strokeDasharray="5 5"
									label={{
										fill: "#991b1b",
										value: "Critical",
										position: "insideBottomRight",
										fontSize: 12,
									}}
								/>

								<ReferenceLine
									y={50}
									stroke="#f59e0b"
									strokeDasharray="5 5"
									label={{
										fill: "#92400e",
										value: "Moderate",
										position: "insideBottomRight",
										fontSize: 12,
									}}
								/>
								<Line
									type="monotone"
									dataKey="cpu"
									stroke="#3b82f6"
									strokeWidth={3}
									connectNulls={true} // Ensures the line stays connected despite gaps
									dot={{ r: 3, fill: "#3b82f6", strokeWidth: 0 }}
									activeDot={{ r: 6, strokeWidth: 0, fill: "#1d4ed8" }}
									isAnimationActive={true}
								/>
							</LineChart>
						</ResponsiveContainer>
					</motion.div>

					{/* Memory & Disk Dual Chart */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						viewport={{ once: true }}
						className="grid lg:grid-cols-2 gap-8"
					>
						{/* Memory Pressure - Smooth Area */}
						<div className="bg-white border-2 border-purple-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
							<div className="flex items-center justify-between gap-3 mb-8">
								<div className="flex items-center gap-3">
									<div className="p-3 bg-gradient-to-br from-purple-200 to-purple-100 rounded-lg">
										<Zap className="w-5 h-5 text-purple-700" />
									</div>
									<div>
										<h3 className="text-lg font-bold text-slate-900">
											Memory Pressure
										</h3>
										<p className="text-xs text-slate-600">
											Real-time memory consumption
										</p>
									</div>
								</div>
								<div className="px-3 py-1.5 bg-purple-100 border-2 border-purple-300 rounded-lg">
									<p className="text-xs font-bold text-purple-800">
										{data?.summary?.memory?.avg.toFixed(1)}%
									</p>
								</div>
							</div>
							<ResponsiveContainer width="100%" height={300}>
								<AreaChart data={chartData}>
									<defs>
										<linearGradient
											id="memGradient"
											x1="0"
											y1="0"
											x2="0"
											y2="1"
										>
											<stop offset="0%" stopColor="#a855f7" stopOpacity={0.3} />
											<stop
												offset="50%"
												stopColor="#a855f7"
												stopOpacity={0.08}
											/>
											<stop
												offset="100%"
												stopColor="#a855f7"
												stopOpacity={0.01}
											/>
										</linearGradient>
									</defs>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke="#e9d5ff"
										vertical={true}
									/>
									<XAxis dataKey="time" stroke="#7e22ce" fontSize={10} />
									<YAxis stroke="#7e22ce" fontSize={10} />
									<Tooltip
										contentStyle={{
											backgroundColor: "#faf5ff",
											border: "2px solid #a855f7",
											borderRadius: "8px",
										}}
										formatter={(value) => [`${value?.toFixed(1)}%`, "Memory"]}
										labelStyle={{ color: "#7e22ce", fontWeight: "bold" }}
									/>
									<ReferenceLine
										y={80}
										stroke="#dc2626"
										strokeDasharray="5 5"
										label={{ fill: "#991b1b", value: "Critical" }}
									/>
									<Area
										type="natural"
										dataKey="mem"
										stroke="#7e22ce"
										fill="url(#memGradient)"
										strokeWidth={2}
										isAnimationActive={true}
										dot={false}
										connectNulls={true}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>

						{/* Disk Latency - Line Chart with Monitoring */}
						<div className="bg-white border-2 border-orange-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
							<div className="flex items-center justify-between gap-3 mb-8">
								<div className="flex items-center gap-3">
									<div className="p-3 bg-gradient-to-br from-orange-200 to-orange-100 rounded-lg">
										<HardDrive className="w-5 h-5 text-orange-700" />
									</div>
									<div>
										<h3 className="text-lg font-bold text-slate-900">
											Disk I/O Latency
										</h3>
										<p className="text-xs text-slate-600">
											Storage response time monitoring
										</p>
									</div>
								</div>
								<div className="px-3 py-1.5 bg-orange-100 border-2 border-orange-300 rounded-lg">
									<p className="text-xs font-bold text-orange-800">
										{data?.summary?.disk?.avg.toFixed(1)}ms
									</p>
								</div>
							</div>
							<ResponsiveContainer width="100%" height={300}>
								<AreaChart data={chartData}>
									<defs>
										<linearGradient
											id="diskGradient"
											x1="0"
											y1="0"
											x2="0"
											y2="1"
										>
											<stop offset="0%" stopColor="#f97316" stopOpacity={0.2} />
											<stop
												offset="50%"
												stopColor="#f97316"
												stopOpacity={0.05}
											/>
											<stop
												offset="100%"
												stopColor="#f97316"
												stopOpacity={0.01}
											/>
										</linearGradient>
									</defs>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke="#fed7aa"
										vertical={true}
									/>
									<XAxis dataKey="time" stroke="#b45309" fontSize={10} />
									<YAxis stroke="#b45309" fontSize={10} />
									<Tooltip
										contentStyle={{
											backgroundColor: "#fef3c7",
											border: "2px solid #f97316",
											borderRadius: "8px",
										}}
										formatter={(value) => [`${value?.toFixed(1)}ms`, "Latency"]}
										labelStyle={{ color: "#b45309", fontWeight: "bold" }}
									/>
									<ReferenceLine
										y={100}
										stroke="#dc2626"
										strokeDasharray="5 5"
										label={{ fill: "#991b1b", value: "Alert" }}
									/>
									<Area
										type="monotone"
										dataKey="disk"
										stroke="#ea580c"
										fill="url(#diskGradient)"
										strokeWidth={2}
										connectNulls={true}
										isAnimationActive={true}
										dot={false}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</motion.div>

					{/* Multi-Metric Comparison - Advanced Composed Chart */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="bg-white border-2 border-indigo-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
					>
						<div className="flex items-center gap-3 mb-8">
							<div className="p-3 bg-gradient-to-br from-indigo-200 to-indigo-100 rounded-lg">
								<TrendingUp className="w-5 h-5 text-indigo-700" />
							</div>
							<div>
								<h3 className="text-xl font-bold text-slate-900">
									System Health Overview
								</h3>
								<p className="text-sm text-slate-600">
									Multi-metric performance comparison and correlation
								</p>
							</div>
						</div>
						<ResponsiveContainer width="100%" height={400}>
							<AreaChart
								data={chartData}
								margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
							>
								<defs>
									<linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
										<stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
									</linearGradient>
									<linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
										<stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
									</linearGradient>
									<linearGradient id="colorDisk" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#ea580c" stopOpacity={0.3} />
										<stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
									</linearGradient>
								</defs>

								<CartesianGrid
									strokeDasharray="3 3"
									vertical={false}
									stroke="#f1f5f9"
								/>

								<XAxis
									dataKey="time"
									fontSize={11}
									tickLine={false}
									// axisLine={false}
									dy={10}
								/>

								{/* Left Axis for Percentages */}
								<YAxis
									yAxisId="left"
									fontSize={11}
									domain={[0, 100]}
									tickLine={false}
									// axisLine={false}
									tickFormatter={(value) => `${value}%`}
								/>

								{/* Right Axis for Latency */}
								<YAxis
									yAxisId="right"
									orientation="right"
									fontSize={11}
									tickLine={false}
									// axisLine={false}
									tickFormatter={(value) => `${value}ms`}
								/>

								<Tooltip
									contentStyle={{
										backgroundColor: "rgba(255, 255, 255, 0.96)",
										border: "1px solid #e2e8f0",
										borderRadius: "8px",
										boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
									}}
								/>

								<Legend
									verticalAlign="top"
									align="right"
									height={36}
									iconType="circle"
									wrapperStyle={{ paddingBottom: "40px" }}
								/>

								{/* CPU Area */}
								<Area
									yAxisId="left"
									type="monotone"
									dataKey="cpu"
									name="CPU Usage"
									stroke="#3b82f6"
									strokeWidth={2}
									fillOpacity={1}
									fill="url(#colorCpu)"
									connectNulls={true}
								/>

								{/* Memory Area */}
								<Area
									yAxisId="left"
									type="monotone"
									dataKey="mem"
									name="Memory Usage"
									stroke="#a855f7"
									strokeWidth={2}
									fillOpacity={1}
									fill="url(#colorMem)"
									connectNulls={true}
								/>

								{/* Disk Latency Area */}
								<Area
									yAxisId="right"
									type="monotone"
									dataKey="disk"
									name="Disk Latency"
									stroke="#ea580c"
									strokeWidth={2}
									fillOpacity={1}
									fill="url(#colorDisk)"
									connectNulls={true}
								/>
							</AreaChart>
						</ResponsiveContainer>
					</motion.div>
				</div>

				{/* Info Footer */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="border-t-2 border-blue-200 pt-8 mt-12"
				>
					<div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-xl p-8">
						<div className="grid md:grid-cols-2 gap-6">
							<div className="flex gap-3">
								<div className="flex-shrink-0">
									<Clock className="w-6 h-6 text-indigo-600 mt-0.5 font-bold" />
								</div>
								<div>
									<p className="font-bold text-slate-900">
										Real-Time Auto-Refresh
									</p>
									<p className="text-sm text-slate-700 mt-1">
										Data updates automatically every 60 seconds. Select
										different time windows for detailed analysis.
									</p>
								</div>
							</div>
							<div className="flex gap-3">
								<div className="flex-shrink-0">
									<TrendingUp className="w-6 h-6 text-indigo-600 mt-0.5 font-bold" />
								</div>
								<div>
									<p className="font-bold text-slate-900">
										Dynamic Chart Scaling
									</p>
									<p className="text-sm text-slate-700 mt-1">
										Charts automatically adjust data sampling for optimal
										visualization across all time windows.
									</p>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
