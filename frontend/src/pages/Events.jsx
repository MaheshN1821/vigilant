import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Legend,
} from "recharts";
import {
	AlertTriangle,
	AlertCircle,
	Info,
	Shield,
	Clock,
	RefreshCcw,
	Search,
	Filter,
	ChevronDown,
	TrendingUp,
	Zap,
} from "lucide-react";
import api from "../lib/api.js";
import { useNavigate } from "react-router-dom";

export default function Events() {
	const [data, setData] = useState(null);
	const [filteredEvents, setFilteredEvents] = useState([]);
	const [lastUpdated, setLastUpdated] = useState(new Date());
	const [severityFilter, setSeverityFilter] = useState("all");
	const [searchTerm, setSearchTerm] = useState("");
	const [expandedEventId, setExpandedEventId] = useState(null);
	const machineId = localStorage.getItem("vigilant-machineId");
	const Navigate = useNavigate();

	useEffect(() => {
		if (!machineId) {
			return Navigate("/auth");
		}
	}, []);

	const severityConfig = {
		CRITICAL: {
			color: "#dc2626",
			bg: "bg-red-50",
			border: "border-red-300",
			badge: "bg-red-100 text-red-700",
		},
		ERROR: {
			color: "#ea580c",
			bg: "bg-orange-50",
			border: "border-orange-300",
			badge: "bg-orange-100 text-orange-700",
		},
		WARNING: {
			color: "#f59e0b",
			bg: "bg-amber-50",
			border: "border-amber-300",
			badge: "bg-amber-100 text-amber-700",
		},
		INFO: {
			color: "#3b82f6",
			bg: "bg-blue-50",
			border: "border-blue-300",
			badge: "bg-blue-100 text-blue-700",
		},
		DEBUG: {
			color: "#6b7280",
			bg: "bg-gray-50",
			border: "border-gray-300",
			badge: "bg-gray-100 text-gray-700",
		},
	};

	const fetchData = async () => {
		try {
			const res = await api.get(
				`/api/analytics/events/${machineId}?window=${7200000}`,
			);
			setData(res?.data);

			setLastUpdated(new Date());

			// Apply filtering
			if (res?.data?.rawData) {
				let events = res.data.rawData;

				if (severityFilter !== "all") {
					events = events.filter((e) => e.severity === severityFilter);
				}

				if (searchTerm) {
					events = events.filter((e) =>
						JSON.stringify(e).toLowerCase().includes(searchTerm.toLowerCase()),
					);
				}

				setFilteredEvents(events);
			}
		} catch (err) {
			// console.error("Failed to fetch system events", err);
		}
	};

	useEffect(() => {
		fetchData();
	}, [machineId]);

	// Auto-refresh every 60 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			fetchData();
		}, 60000);

		return () => clearInterval(interval);
	}, [machineId, severityFilter, searchTerm]);

	// Re-filter when severity or search changes
	useEffect(() => {
		if (data?.rawData) {
			let events = data.rawData;

			if (severityFilter !== "all") {
				events = events.filter((e) => e.severity === severityFilter);
			}

			if (searchTerm) {
				events = events.filter((e) =>
					JSON.stringify(e).toLowerCase().includes(searchTerm.toLowerCase()),
				);
			}

			setFilteredEvents(events);
		}
	}, [data, severityFilter, searchTerm]);

	// Calculate statistics
	const stats = {
		total: data?.rawData?.length || 0,
		critical:
			data?.rawData?.filter((e) => e.severity === "CRITICAL").length || 0,
		error: data?.rawData?.filter((e) => e.severity === "ERROR").length || 0,
		warning: data?.rawData?.filter((e) => e.severity === "WARNING").length || 0,
	};

	// Severity distribution for pie chart
	const severityData = [
		{ name: "Critical", value: stats.critical, fill: "#dc2626" },
		{ name: "Error", value: stats.error, fill: "#ea580c" },
		{ name: "Warning", value: stats.warning, fill: "#f59e0b" },
		{
			name: "Info",
			value: data?.rawData?.filter((e) => e.severity === "INFO").length || 0,
			fill: "#3b82f6",
		},
		{
			name: "Debug",
			value: data?.rawData?.filter((e) => e.severity === "DEBUG").length || 0,
			fill: "#6b7280",
		},
	].filter((item) => item.value > 0);

	// Event frequency by time (last hour)
	const eventFrequencyData = (() => {
		const now = new Date();
		const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);
		const timeSlots = {};

		for (let i = 0; i < 60; i += 1) {
			const time = new Date(hourAgo.getTime() + i * 60 * 1000);
			const key = time.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
			});
			timeSlots[key] = 0;
		}

		data?.rawData?.forEach((event) => {
			const eventTime = new Date(event.timestamp);
			if (eventTime >= hourAgo) {
				const key = eventTime.toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
				});
				if (timeSlots[key] !== undefined) {
					timeSlots[key]++;
				}
			}
		});

		return Object.entries(timeSlots).map(([time, count]) => ({ time, count }));
	})();

	// Event sources/types
	const eventSourceData = (() => {
		const sources = {};
		data?.rawData?.forEach((event) => {
			const source = event?.source || "Unknown";
			sources[source] = (sources[source] || 0) + 1;
		});
		return Object.entries(sources).map(([source, count]) => ({
			source,
			count,
		}));
	})();

	if (!data) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
				<motion.div
					animate={{ opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 2, repeat: Infinity }}
					className="text-center"
				>
					<div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-indigo-600 animate-spin mx-auto mb-4"></div>
					<p className="text-slate-700 font-medium">Loading system events...</p>
				</motion.div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
			{/* Header */}
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
									<Shield className="w-6 h-6 text-indigo-700" />
								</div> */}
								System Events
							</h1>
							{/* <p className="text-slate-600 text-sm">
								Security and system events for{" "}
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
								onClick={fetchData}
								className="p-3 rounded-lg bg-indigo-200 hover:bg-indigo-300 text-indigo-700 transition-colors"
							>
								<RefreshCcw size={18} />
							</motion.button>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-6 py-8">
				{/* Stats Cards */}
				<div className="grid md:grid-cols-4 gap-6 mb-8">
					{[
						{
							label: "Total Events",
							value: stats.total,
							icon: TrendingUp,
							color: "from-blue-200 to-blue-100 border-blue-300",
						},
						{
							label: "Critical",
							value: stats.critical,
							icon: AlertTriangle,
							color: "from-red-200 to-red-100 border-red-300",
						},
						{
							label: "Errors",
							value: stats.error,
							icon: AlertCircle,
							color: "from-orange-200 to-orange-100 border-orange-300",
						},
						{
							label: "Warnings",
							value: stats.warning,
							icon: Zap,
							color: "from-amber-200 to-amber-100 border-amber-300",
						},
					].map((stat, idx) => {
						const Icon = stat.icon;
						return (
							<motion.div
								key={idx}
								whileHover={{ translateY: -6, scale: 1.02 }}
								transition={{ duration: 0.3 }}
								className={`bg-gradient-to-br ${stat.color} border-2 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all`}
							>
								<div className="flex items-start justify-between">
									<div>
										<p className="text-sm font-semibold text-slate-700 opacity-75 uppercase">
											{stat.label}
										</p>
										<p className="text-4xl font-bold text-slate-900 mt-2">
											{stat.value}
										</p>
									</div>
									<Icon className="w-8 h-8" />
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* Charts Section */}
				<div className="grid lg:grid-cols-2 gap-8 mb-8">
					{/* Severity Distribution */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="bg-white border-2 border-blue-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
					>
						<div className="flex items-center gap-3 mb-8">
							<div className="p-3 bg-gradient-to-br from-blue-200 to-blue-100 rounded-lg">
								<AlertTriangle className="w-5 h-5 text-blue-700" />
							</div>
							<div>
								<h3 className="text-xl font-bold text-slate-900">
									Severity Distribution
								</h3>
								<p className="text-sm text-slate-600">
									Event severity breakdown
								</p>
							</div>
						</div>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={severityData}
									cx="50%"
									cy="50%"
									labelLine={false}
									label={({ name, value }) => `${name}: ${value}`}
									outerRadius={100}
									fill="#8884d8"
									dataKey="value"
								>
									{severityData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.fill} />
									))}
								</Pie>
								<Tooltip formatter={(value) => value} />
							</PieChart>
						</ResponsiveContainer>
					</motion.div>

					{/* Event Frequency */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						viewport={{ once: true }}
						className="bg-white border-2 border-purple-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
					>
						<div className="flex items-center gap-3 mb-8">
							<div className="p-3 bg-gradient-to-br from-purple-200 to-purple-100 rounded-lg">
								<Clock className="w-5 h-5 text-purple-700" />
							</div>
							<div>
								<h3 className="text-xl font-bold text-slate-900">
									Event Frequency
								</h3>
								<p className="text-sm text-slate-600">
									Last 60 minutes timeline
								</p>
							</div>
						</div>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={eventFrequencyData} className="outline-none">
								<defs>
									<linearGradient id="freqGradient" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stopColor="#a855f7" stopOpacity={0.8} />
										<stop offset="100%" stopColor="#a855f7" stopOpacity={0.2} />
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#e9d5ff"
									vertical={false}
								/>
								<XAxis dataKey="time" stroke="#7e22ce" fontSize={10} />
								<YAxis stroke="#7e22ce" fontSize={10} />
								<Tooltip
									contentStyle={{
										backgroundColor: "#6f31ad",
										border: "2px solid #a855f7",
										borderRadius: "8px",
									}}
									formatter={(value) => [`${value} events`, "Count"]}
								/>
								<Bar
									dataKey="count"
									connectNulls={true}
									fill="url(#freqGradient)"
									isAnimationActive={true}
								/>
							</BarChart>
						</ResponsiveContainer>
					</motion.div>
				</div>

				{/* Event Source Distribution */}
				{eventSourceData.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="bg-white border-2 border-orange-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow mb-8"
					>
						<div className="flex items-center gap-3 mb-8">
							<div className="p-3 bg-gradient-to-br from-orange-200 to-orange-100 rounded-lg">
								<Info className="w-5 h-5 text-orange-700" />
							</div>
							<div>
								<h3 className="text-xl font-bold text-slate-900">
									Event Sources
								</h3>
								<p className="text-sm text-slate-600">Distribution by source</p>
							</div>
						</div>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={eventSourceData} layout="vertical">
								<defs>
									<linearGradient
										id="sourceGradient"
										x1="0"
										y1="0"
										x2="1"
										y2="0"
									>
										<stop offset="0%" stopColor="#f97316" stopOpacity={0.3} />
										<stop offset="100%" stopColor="#f97316" stopOpacity={0.8} />
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#fed7aa"
									vertical={true}
								/>
								<XAxis type="number" stroke="#b45309" fontSize={10} />
								<YAxis
									type="category"
									dataKey="source"
									stroke="#b45309"
									fontSize={11}
									width={100}
								/>
								<Tooltip
									contentStyle={{
										backgroundColor: "#df8826",
										border: "2px solid #f97316",
										borderRadius: "8px",
									}}
									formatter={(value) => [`${value} events`, "Count"]}
								/>
								<Bar
									dataKey="count"
									fill="url(#sourceGradient)"
									isAnimationActive={true}
								/>
							</BarChart>
						</ResponsiveContainer>
					</motion.div>
				)}

				{/* Filters & Search */}
				<div className="bg-white text-black border-2 border-indigo-200 rounded-2xl p-8 shadow-lg mb-8">
					<div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
							<input
								type="text"
								placeholder="Search events..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 text-black pr-4 py-3 bg-slate-100 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
							/>
						</div>
						<div className="flex gap-3 items-center">
							<Filter className="w-5 h-5 text-slate-600" />
							<select
								value={severityFilter}
								onChange={(e) => setSeverityFilter(e.target.value)}
								className="px-4 py-3 bg-slate-100 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors font-medium"
							>
								<option value="all">All Severities</option>
								<option value="CRITICAL">Critical</option>
								<option value="ERROR">Error</option>
								<option value="WARNING">Warning</option>
								<option value="INFO">Info</option>
								<option value="DEBUG">Debug</option>
							</select>
						</div>
					</div>
				</div>

				{/* Events List */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="space-y-4"
				>
					<h3 className="text-xl font-bold text-slate-900 mb-6">
						Recent Events
						<span className="text-sm font-semibold text-slate-600 ml-2">
							({filteredEvents.length})
						</span>
					</h3>

					{filteredEvents.length === 0 ? (
						<div className="bg-white border-2 border-slate-200 rounded-2xl p-12 text-center">
							<AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
							<p className="text-slate-600 font-medium">No events found</p>
						</div>
					) : (
						filteredEvents.slice(0, 20).map((event, idx) => {
							const severity = event.severity || "INFO";
							const config = severityConfig[severity] || severityConfig.INFO;
							return (
								<motion.div
									key={idx}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.3, delay: idx * 0.05 }}
									viewport={{ once: true }}
									className={`${config.bg} border-2 ${config.border} rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer`}
									onClick={() =>
										setExpandedEventId(expandedEventId === idx ? null : idx)
									}
								>
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1">
											<div className="flex items-center gap-3 mb-2">
												<span
													className={`px-3 py-1 rounded-full text-xs font-bold ${config.badge}`}
												>
													{severity}
												</span>
												<span className="text-sm text-slate-600">
													{new Date(event.timestamp).toLocaleString()}
												</span>
											</div>
											<p className="font-bold text-slate-900">
												{event?.source || "System"} - Event ID:{" "}
												{event?.eventId || "N/A"}
											</p>
											{event?.fields?.TargetName && (
												<p className="text-sm text-slate-700 mt-1">
													User:{" "}
													<span className="font-semibold">
														{event?.fields?.TargetName}
													</span>
												</p>
											)}
										</div>
										<ChevronDown
											className={`w-5 h-5 text-slate-600 transition-transform ${
												expandedEventId === idx ? "rotate-180" : ""
											}`}
										/>
									</div>

									{/* Expanded Details */}
									{expandedEventId === idx && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											transition={{ duration: 0.3 }}
											className="mt-6 pt-6 border-t border-current border-opacity-20"
										>
											<div className="grid md:grid-cols-2 gap-4 text-sm">
												{Object.entries(event?.fields || {}).map(
													([key, value]) => (
														<div key={key}>
															<p className="font-semibold text-slate-900 capitalize">
																{key.replace(/([A-Z])/g, " $1").trim()}
															</p>
															<p className="text-slate-700 break-words text-xs mt-1">
																{String(value)}
															</p>
														</div>
													),
												)}
											</div>
										</motion.div>
									)}
								</motion.div>
							);
						})
					)}
				</motion.div>

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
										Events update automatically every 60 seconds for real-time
										monitoring.
									</p>
								</div>
							</div>
							<div className="flex gap-3">
								<div className="flex-shrink-0">
									<TrendingUp className="w-6 h-6 text-indigo-600 mt-0.5 font-bold" />
								</div>
								<div>
									<p className="font-bold text-slate-900">Advanced Filtering</p>
									<p className="text-sm text-slate-700 mt-1">
										Filter by severity level and search across all event details
										instantly.
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

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
// 	BarChart,
// 	Bar,
// 	XAxis,
// 	YAxis,
// 	Tooltip,
// 	ResponsiveContainer,
// 	Cell,
// } from "recharts";
// import { ShieldAlert, Terminal, Search, Filter } from "lucide-react";
// import api from "../lib/api.js";

// export default function Events({ machineId }) {
// 	const [data, setData] = useState(null);
// 	const [window, setWindow] = useState(300000);
// 	const [filter, setFilter] = useState("");

// 	useEffect(() => {
// 		const getData = async () => {
// 			try {
// 				const res = await api.get(
// 					`/api/analytics/events/${machineId}?window=${window}`,
// 				);
// 				setData(res?.data);
// 				console.log(res);
// 				console.log(window);
// 			} catch (error) {}
// 		};
// 		getData();
// 	}, [window, machineId]);

// 	const filteredLogs =
// 		data?.rawData?.filter((log) =>
// 			JSON.stringify(log).toLowerCase().includes(filter.toLowerCase()),
// 		) || [];

// 	return (
// 		<div className="p-6 bg-black min-h-screen text-slate-300">
// 			<div className="mb-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
// 				<div>
// 					<h1 className="text-3xl font-bold text-white flex items-center gap-3">
// 						<ShieldAlert className="text-red-500" /> Security Audit
// 					</h1>
// 					<p className="text-slate-500 font-mono text-sm">
// 						Target: {machineId}
// 					</p>
// 				</div>

// 				<div className="flex gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
// 					{[60000, 300000, 7200000].map((t) => (
// 						<button
// 							key={t}
// 							onClick={() => setWindow(t)}
// 							className={`px-4 py-1 rounded-lg text-xs ${window === t ? "bg-red-600 text-white" : "text-slate-500"}`}
// 						>
// 							{t / 60000}m
// 						</button>
// 					))}
// 				</div>
// 			</div>

// 			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// 				{/* Left: Event ID Distribution */}
// 				<div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
// 					<h3 className="text-white text-xs font-bold uppercase mb-6">
// 						Signal Frequency
// 					</h3>
// 					<div className="h-64">
// 						<ResponsiveContainer width="100%" height="100%">
// 							<BarChart data={data?.eventIdInsights}>
// 								<XAxis dataKey="eventId" stroke="#475569" fontSize={10} />
// 								<Tooltip
// 									cursor={{ fill: "transparent" }}
// 									contentStyle={{ backgroundColor: "#0f172a" }}
// 								/>
// 								<Bar dataKey="count" radius={[4, 4, 0, 0]}>
// 									{data?.eventIdInsights?.map((entry, index) => (
// 										<Cell
// 											key={`cell-${index}`}
// 											fill={entry.severity === "DEBUG" ? "#334155" : "#ef4444"}
// 										/>
// 									))}
// 								</Bar>
// 							</BarChart>
// 						</ResponsiveContainer>
// 					</div>
// 				</div>

// 				{/* Right: Live Log Feed */}
// 				<div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col">
// 					<div className="p-4 border-b border-slate-800 flex justify-between items-center">
// 						<div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase">
// 							<Terminal size={14} /> Intelligence Feed
// 						</div>
// 						<div className="relative">
// 							<Search
// 								className="absolute left-3 top-2.5 text-slate-500"
// 								size={14}
// 							/>
// 							<input
// 								type="text"
// 								placeholder="Filter signals..."
// 								className="bg-black border border-slate-700 rounded-full pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-red-500 w-48"
// 								onChange={(e) => setFilter(e.target.value)}
// 							/>
// 						</div>
// 					</div>

// 					<div className="flex-1 overflow-y-auto max-h-[400px] p-4 font-mono text-[11px]">
// 						<AnimatePresence>
// 							{filteredLogs.map((log, i) => (
// 								<motion.div
// 									initial={{ opacity: 0, x: -10 }}
// 									animate={{ opacity: 1, x: 0 }}
// 									key={i}
// 									className="mb-2 p-3 bg-black rounded border-l-2 border-red-900 hover:border-red-500 transition-all"
// 								>
// 									<div className="flex justify-between mb-1">
// 										<span className="text-red-500 font-bold">[{log.name}]</span>
// 										<span className="text-slate-600">
// 											{new Date(log.timestamp).toLocaleTimeString()}
// 										</span>
// 									</div>
// 									<div className="text-slate-400">
// 										ID: {log?.event?.event_id} | User:{" "}
// 										{log?.event?.fields.TargetUserName || "SYSTEM"}
// 									</div>
// 									<div className="text-[10px] text-slate-600 truncate">
// 										{log?.event?.fields.CallerProcessName}
// 									</div>
// 								</motion.div>
// 							))}
// 						</AnimatePresence>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
