import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import { validate } from "uuid";
import {
	RefreshCcw,
	AlertTriangle,
	CheckCircle2,
	TrendingUp,
	Activity,
	ChevronRight,
	Clock,
	CheckCircle,
	XCircle,
	Database,
	Cpu,
	HardDrive,
	Zap,
	FileText,
	ExternalLink,
	Youtube,
	BookOpen,
	PlayCircle,
	ChevronDown,
	ChevronUp,
	Info,
	AlertCircle,
	Target,
	Eye,
	Lightbulb,
	BarChart3,
	Settings,
	Shield,
} from "lucide-react";

function Dashboard() {
	const userName = localStorage.getItem("vigilant-username") || "User";
	const machineId = localStorage.getItem("vigilant-machineId");
	const token = localStorage.getItem("vigilant-token");
	const email =
		localStorage.getItem("vigilant-email") || "maheshmahi18042004@gmail.com";
	const Navigate = useNavigate();

	const [eventData, setEventData] = useState([]);
	const [machineIdState, setMachineIdState] = useState(false);
	const [metricData, setMetricData] = useState({
		cpu: {},
		disk: {},
		memory: {},
	});
	const [isLoading, setIsLoading] = useState(true);
	const [lastUpdated, setLastUpdated] = useState(new Date());
	const [isAutoRefreshing, setIsAutoRefreshing] = useState(true);

	const [analysis, setAnalysis] = useState(null);
	const [loading, setLoading] = useState(false);
	// const [error, setError] = useState(null);
	const [expandedActions, setExpandedActions] = useState({});

	useEffect(() => {
		if (!token) {
			return Navigate("/auth");
		}
	}, []);

	const getData = async () => {
		try {
			if (machineId) {
				setIsLoading(true);
				const evntRes = await api.get(
					`/api/analytics/${machineId}?window=${7200000}`,
				);
				const metricRes = await api.get(
					`/api/analytics/metrics/${machineId}?window=${3600000}`,
				);
				const eventDataExtracted = evntRes?.data?.eventIdInsights;

				const highSeverityEvents = eventDataExtracted.filter((event) =>
					["WARNING", "CRITICAL", "ERROR"].includes(
						event.severity.toUpperCase(),
					),
				);

				// console.log(highSeverityEvents);
				if (highSeverityEvents.length > 0) {
					// console.log(email);

					const res = await api.post("/api/alerts", {
						data: JSON.stringify({
							email: email,
							highSeverityEvents,
							timestamp: new Date().toISOString(),
						}),
					});
					// console.log(res);
				}

				setEventData(evntRes?.data?.eventIdInsights);
				setMetricData(metricRes?.data?.summary);
				setLastUpdated(new Date());
			}
		} catch (err) {
			// console.error("Error fetching data:", err);
		} finally {
			setIsLoading(false);
		}
	};

	// Initial fetch
	useEffect(() => {
		getData();
	}, [machineId]);

	// Auto-refresh every 60 seconds
	useEffect(() => {
		if (!isAutoRefreshing) return;

		const interval = setInterval(() => {
			getData();
		}, 60000);

		return () => clearInterval(interval);
	}, [isAutoRefreshing, machineId]);

	const [mId, setMId] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (e) => {
		const value = e.target.value.trim();
		setMId(value);

		if (value === "") {
			setIsValid(false);
			setError("");
			return;
		}

		const valid = validate(value);
		setIsValid(valid);
		setError(
			valid
				? ""
				: "Enter valid UUID v4 (e.g., 16bxxxx4-a5xx-4x6x-8xxd-8axxa2xx6a41)",
		);
	};

	const handlePatch = async () => {
		if (!isValid || !mId) {
			alert("Invalid Machine-Id!");
			return;
		}
		try {
			const res = await api.patch(`/api/configure/machine-id/${mId}`, {
				email: email,
			});
			// console.log("Machine ID updated:", res);
		} catch (err) {
			// console.error("Error updating machine ID:", err);
		}
	};

	const getSeverityColor = (severity) => {
		if (!severity) return "bg-gray-100 text-gray-700 border-gray-300";
		const severityLower = severity.toLowerCase();
		if (severityLower.includes("critical") || severityLower.includes("error"))
			return "bg-red-100 text-red-700 border-red-300";
		if (severityLower.includes("warning"))
			return "bg-amber-100 text-amber-700 border-amber-300";
		if (severityLower.includes("info"))
			return "bg-blue-100 text-blue-700 border-blue-300";
		return "bg-slate-100 text-slate-700 border-slate-300";
	};

	const getSeverityIcon = (severity) => {
		if (!severity) return null;
		const severityLower = severity.toLowerCase();
		if (severityLower.includes("critical") || severityLower.includes("error"))
			return <AlertTriangle className="w-4 h-4" />;
		if (severityLower.includes("warning"))
			return <AlertCircle className="w-4 h-4" />;
		return <CheckCircle2 className="w-4 h-4" />;
	};

	const topEvents = eventData.slice(0, 5);
	const criticalCount = eventData.filter(
		(e) =>
			e?.severity?.toLowerCase().includes("critical") ||
			e?.severity?.toLowerCase().includes("error"),
	).length;
	//AI - Analysis:

	const handleAiSummary = async (data) => {
		if (data == "metrics") {
			// console.log(data);
			return;
		}
		setLoading(true);
		setError(null);

		try {
			const response = await api.get(`/api/ai/analyze-events/${machineId}`);
			if (response.data.success) {
				setAnalysis(response.data.data);
			} else {
				// Handle fallback analysis from parsing errors
				if (response.data.fallback_analysis) {
					setAnalysis(response.data.fallback_analysis);
					setError(
						`${response.data.error}: ${response.data.details?.suggestion || "Please try again"}`,
					);
				} else {
					setError(response.data.error || "Analysis failed");
				}
			}
		} catch (err) {
			const errorMessage =
				err.response?.data?.message ||
				err.response?.data?.suggestion ||
				err.message ||
				"Failed to analyze logs";
			setError(errorMessage);
			// console.error("Analysis error:", err);

			// Log detailed error info for debugging
			if (err.response?.data) {
				// console.error("Error details:", err.response.data);
			}
		} finally {
			setLoading(false);
		}
	};

	const getSeverityConfig = (severity) => {
		const configs = {
			HEALTHY: {
				color: "text-green-600",
				bg: "bg-green-50",
				border: "border-green-200",
				icon: CheckCircle,
			},
			INFO: {
				color: "text-blue-600",
				bg: "bg-blue-50",
				border: "border-blue-200",
				icon: Info,
			},
			WARNING: {
				color: "text-yellow-600",
				bg: "bg-yellow-50",
				border: "border-yellow-200",
				icon: AlertTriangle,
			},
			ERROR: {
				color: "text-red-600",
				bg: "bg-red-50",
				border: "border-red-200",
				icon: XCircle,
			},
			CRITICAL: {
				color: "text-red-700",
				bg: "bg-red-100",
				border: "border-red-300",
				icon: AlertCircle,
			},
			LOW: {
				color: "text-green-600",
				bg: "bg-green-50",
				border: "border-green-200",
				icon: CheckCircle,
			},
			MEDIUM: {
				color: "text-yellow-600",
				bg: "bg-yellow-50",
				border: "border-yellow-200",
				icon: AlertTriangle,
			},
			HIGH: {
				color: "text-red-600",
				bg: "bg-red-50",
				border: "border-red-200",
				icon: AlertCircle,
			},
		};
		return (
			configs[severity] || {
				color: "text-gray-600",
				bg: "bg-gray-50",
				border: "border-gray-200",
				icon: Info,
			}
		);
	};

	const getPriorityConfig = (priority) => {
		const configs = {
			IMMEDIATE: {
				color: "text-red-700",
				bg: "bg-red-100",
				border: "border-red-200",
			},
			HIGH: {
				color: "text-orange-700",
				bg: "bg-orange-100",
				border: "border-orange-200",
			},
			MEDIUM: {
				color: "text-yellow-700",
				bg: "bg-yellow-100",
				border: "border-yellow-200",
			},
			LOW: {
				color: "text-green-700",
				bg: "bg-green-100",
				border: "border-green-200",
			},
		};
		return (
			configs[priority] || {
				color: "text-gray-700",
				bg: "bg-gray-100",
				border: "border-gray-200",
			}
		);
	};

	const toggleAction = (index) => {
		setExpandedActions((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	const getResourceIcon = (type) => {
		switch (type) {
			case "video":
				return Youtube;
			case "article":
				return FileText;
			case "documentation":
				return BookOpen;
			default:
				return ExternalLink;
		}
	};

	useEffect(() => {
		if (machineId?.length === 36) {
			setMachineIdState(true);
		}
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-10">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-blue-100"
			>
				<div className="max-w-7xl mx-auto px-6 py-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-slate-900">
								Welcome, <span className="text-indigo-600">{userName}</span>!
							</h1>
							<p className="text-sm text-slate-600 mt-1">
								System monitoring and analytics dashboard
							</p>
						</div>
						<div className="flex items-center gap-4">
							<div className="text-right">
								<p className="text-xs text-slate-600">Last updated</p>
								<p className="text-sm font-semibold text-slate-900">
									{lastUpdated.toLocaleTimeString()}
								</p>
							</div>
							<motion.button
								whileHover={{ rotate: 180 }}
								whileTap={{ scale: 0.95 }}
								onClick={getData}
								className="p-3 bg-gradient-to-br from-indigo-200 to-blue-200 hover:from-indigo-300 hover:to-blue-300 rounded-lg text-indigo-700 transition-all"
							>
								<RefreshCcw size={20} />
							</motion.button>
						</div>
					</div>
					{isAutoRefreshing && (
						<div className="mt-4 flex items-center justify-end gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg w-fit">
							<div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></div>
							Auto-refresh enabled (every 60 seconds)
						</div>
					)}
				</div>
			</motion.div>

			<div className="max-w-7xl mx-auto px-6 py-12">
				{/* Configure Machine ID Section */}
				{!machineIdState ? (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="mb-24"
					>
						<div className="bg-white border-2 border-blue-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-3 bg-gradient-to-br from-blue-200 to-blue-100 rounded-lg">
									<Zap className="w-6 h-6 text-blue-700" />
								</div>
								<div>
									<h2 className="text-2xl font-bold text-slate-900">
										Configure Machine ID
									</h2>
									<p className="text-sm text-slate-600 mt-1">
										Set up your system for monitoring
									</p>
								</div>
							</div>

							<div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
								<p className="text-slate-700 mb-3">
									Refer the Installation Guide to locate the machine-Id
								</p>
								<motion.button
									whileHover={{ scale: 1.02, translateX: 4 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => Navigate("/installation-guide")}
									className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
								>
									View Installation Guide
									<ChevronRight size={18} />
								</motion.button>
							</div>

							<div className="space-y-4">
								<input
									type="text"
									placeholder="Enter Machine-Id (UUID v4)"
									onChange={handleChange}
									value={mId}
									className={`w-full text-black px-4 py-3 rounded-lg border-2 font-mono text-sm focus:outline-none transition-all ${
										isValid
											? "border-emerald-300 bg-emerald-50"
											: error
												? "border-red-300 bg-red-50"
												: "border-slate-300 bg-white"
									}`}
								/>
								{error && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg"
									>
										{error}
									</motion.p>
								)}
								{isValid && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg"
									>
										<CheckCircle2 size={16} />
										Valid Machine-Id
									</motion.div>
								)}
								<motion.button
									whileHover={{ scale: isValid ? 1.02 : 1 }}
									whileTap={{ scale: 0.98 }}
									onClick={handlePatch}
									disabled={!isValid}
									className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
								>
									Update Machine
								</motion.button>
							</div>
						</div>
					</motion.div>
				) : (
					<></>
				)}

				{/* <div className="flex flex-row flex-wrap items-start justify-between"> */}
				<div className="grid lg:grid-cols-2 gap-8 ">
					{/* Metrics Summary Cards */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, staggerChildren: 0.1 }}
						viewport={{ once: true }}
						className="mb-12 border-r border-black pr-8"
					>
						<h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
							<Activity className="w-6 h-6 text-indigo-600" />
							System Metrics Summary
						</h2>

						<div className="grid md:grid-cols-3 gap-6">
							{/* CPU Card */}
							<motion.div
								whileHover={{ translateY: -6, scale: 1.02 }}
								transition={{ duration: 0.3 }}
								className="bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-300 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow"
							>
								<div className="flex items-center justify-between mb-4">
									<div className="p-3 bg-gradient-to-br from-blue-200 to-blue-100 rounded-lg">
										<Cpu className="w-6 h-6 text-blue-700" />
									</div>
									<TrendingUp className="w-5 h-5 text-blue-600" />
								</div>
								<p className="text-slate-600 text-sm mb-1 mt-9">
									CPU Utilization
								</p>
								<p className="text-4xl font-bold text-slate-900 mb-2">
									{metricData?.cpu?.avg ? metricData.cpu.avg.toFixed(1) : "N/A"}
									<span className="text-lg text-slate-600">%</span>
								</p>
								<div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
									<motion.div
										initial={{ width: 0 }}
										animate={{
											width: `${Math.min(metricData?.cpu?.avg || 0, 100)}%`,
										}}
										transition={{ duration: 1 }}
										className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
									></motion.div>
								</div>
							</motion.div>

							{/* Memory Card */}
							<motion.div
								whileHover={{ translateY: -6, scale: 1.02 }}
								transition={{ duration: 0.3 }}
								className="bg-gradient-to-br from-purple-100 to-purple-50 border-2 border-purple-300 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow"
							>
								<div className="flex items-center justify-between mb-4">
									<div className="p-3 bg-gradient-to-br from-purple-200 to-purple-100 rounded-lg">
										<Activity className="w-6 h-6 text-purple-700" />
									</div>
									<TrendingUp className="w-5 h-5 text-purple-600" />
								</div>
								<p className="text-slate-600 text-sm mb-1 mt-9">
									Memory Utilization
								</p>
								<p className="text-4xl font-bold text-slate-900 mb-2">
									{metricData?.memory?.avg
										? metricData.memory.avg.toFixed(1)
										: "N/A"}
									<span className="text-lg text-slate-600">%</span>
								</p>
								<div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden">
									<motion.div
										initial={{ width: 0 }}
										animate={{
											width: `${Math.min(metricData?.memory?.avg || 0, 100)}%`,
										}}
										transition={{ duration: 1 }}
										className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
									></motion.div>
								</div>
							</motion.div>

							{/* Disk Card */}
							<motion.div
								whileHover={{ translateY: -6, scale: 1.02 }}
								transition={{ duration: 0.3 }}
								className="bg-gradient-to-br from-orange-100 to-orange-50 border-2 border-orange-300 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow"
							>
								<div className="flex items-center justify-between mb-4">
									<div className="p-3 bg-gradient-to-br from-orange-200 to-orange-100 rounded-lg">
										<HardDrive className="w-6 h-6 text-orange-700" />
									</div>
									<TrendingUp className="w-5 h-5 text-orange-600" />
								</div>
								<p className="text-slate-600 text-sm mb-1 mt-9">
									Disk I/O Latency
								</p>
								<p className="text-4xl font-bold text-slate-900 mb-2">
									{metricData?.disk?.avg
										? metricData.disk.avg.toFixed(1)
										: "N/A"}
									<span className="text-lg text-slate-600">ms</span>
								</p>
								<div className="w-full h-2 bg-orange-200 rounded-full overflow-hidden">
									<motion.div
										initial={{ width: 0 }}
										animate={{
											width: `${Math.min((metricData?.disk?.avg || 0) / 2, 100)}%`,
										}}
										transition={{ duration: 1 }}
										className="h-full bg-gradient-to-r from-orange-600 to-red-600 rounded-full"
									></motion.div>
								</div>
							</motion.div>
						</div>

						<div className="grid md:grid-cols-2 gap-4 mt-6">
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => Navigate("/dashboard/metrics")}
								className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
							>
								<TrendingUp size={18} />
								View Detailed Metrics
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => handleAiSummary("metrics")}
								className="px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-50 border-2 border-slate-300 text-slate-900 rounded-lg font-semibold hover:shadow-lg transition-shadow"
							>
								AI Analysis
							</motion.button>
						</div>
					</motion.div>

					{/* Events Summary Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="mb-12"
					>
						<h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
							<AlertCircle className="w-6 h-6 text-indigo-600" />
							System Events Summary
						</h2>

						{/* Top Events */}
						<div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
							<h3 className="text-xl font-bold text-slate-900 mb-6">
								Top Events Occurring
							</h3>
							<div className="space-y-4 grid md:grid-cols-2 gap-4 mt-6">
								{topEvents.length > 0 ? (
									topEvents.map((event, index) => (
										<motion.div
											key={index}
											initial={{ opacity: 0, x: -20 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.5, delay: index * 0.1 }}
											viewport={{ once: true }}
											className="bg-gradient-to-r from-slate-50 to-slate-100 border border-indigo-600 rounded-lg p-4 hover:shadow-md transition-shadow"
										>
											<div className="relative flex items-start justify-between">
												<div className="flex-1">
													<div className="flex items-center gap-3 mb-2">
														{/* {getSeverityIcon(event?.severity)} */}
														{/* <h4 className="font-semibold text-slate-900">
															{event?.name || "Unknown Event"}
														</h4> */}
														<p className="font-semibold text-slate-900">
															Event ID:{" "}
															<span className="font-mono">
																{event?.eventId}
															</span>
														</p>
														<span
															className={`absolute bottom-0 left-0 text-xs px-3 py-1 rounded-full border font-semibold ${getSeverityColor(event?.severity)}`}
														>
															{event?.severity || "Unknown"}
														</span>
													</div>
													<h4 className="text-sm text-slate-600">
														{event?.name || "Unknown Event"}
													</h4>
													{/* <p className="text-xs text-slate-600">
														Event ID:{" "}
														<span className="font-mono">{event?.eventId}</span>
													</p> */}
												</div>
												<div className="text-right mb-10">
													<p className="text-2xl font-bold text-indigo-600">
														{event?.count}
													</p>
													<p className="text-xs text-slate-600">occurrences</p>
												</div>
											</div>
										</motion.div>
									))
								) : (
									<div className="text-center py-8">
										<CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
										<p className="text-slate-600">
											No critical events detected
										</p>
									</div>
								)}
							</div>
							<div className="grid md:grid-cols-2 gap-4 mt-6">
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => Navigate("/dashboard/events")}
									className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
								>
									<TrendingUp size={18} />
									View Detailed Events
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => handleAiSummary("events")}
									className="px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-50 border-2 border-slate-300 text-slate-900 rounded-lg font-semibold hover:shadow-lg transition-shadow"
								>
									AI Analysis
								</motion.button>
							</div>
						</div>
					</motion.div>
				</div>

				{/* {machineId ? (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="mb-12"
					>
						<div className="bg-white border-2 border-blue-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-3 bg-gradient-to-br from-blue-200 to-blue-100 rounded-lg">
									<Zap className="w-6 h-6 text-blue-700" />
								</div>
								<div>
									<h2 className="text-2xl font-bold text-slate-900">
										Configure Machine ID
									</h2>
									<p className="text-sm text-slate-600 mt-1">
										Set up your system for monitoring
									</p>
								</div>
							</div>

							<div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
								<p className="text-slate-700 mb-3">
									Refer the Installation Guide to locate the machine-Id
								</p>
								<motion.button
									whileHover={{ scale: 1.02, translateX: 4 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => Navigate("/installation-guide")}
									className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
								>
									View Installation Guide
									<ChevronRight size={18} />
								</motion.button>
							</div>

							<div className="space-y-4">
								<input
									type="text"
									placeholder="Enter Machine-Id (UUID v4)"
									onChange={handleChange}
									value={mId}
									className={`w-full text-black px-4 py-3 rounded-lg border-2 font-mono text-sm focus:outline-none transition-all ${
										isValid
											? "border-emerald-300 bg-emerald-50"
											: error
												? "border-red-300 bg-red-50"
												: "border-slate-300 bg-white"
									}`}
								/>
								{error && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg"
									>
										{error}
									</motion.p>
								)}
								{isValid && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg"
									>
										<CheckCircle2 size={16} />
										Valid Machine-Id
									</motion.div>
								)}
								<motion.button
									whileHover={{ scale: isValid ? 1.02 : 1 }}
									whileTap={{ scale: 0.98 }}
									onClick={handlePatch}
									disabled={!isValid}
									className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
								>
									Update Machine
								</motion.button>
							</div>
						</div>
					</motion.div>
				) : (
					<></>
				)} */}
			</div>

			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
				<div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
					{/* Header */}
					{/* <div className="text-center mb-8">
						<div className="flex items-center justify-center gap-3 mb-4">
							<Activity className="w-10 h-10 text-indigo-600" />
							<h1 className="text-4xl font-bold text-gray-900">
								System Log Analyzer
							</h1>
						</div>
						<p className="text-lg text-gray-600">
							AI-powered event analysis and anomaly detection
						</p>
					</div> */}

					{/* Action Button */}
					{/* <div className="flex justify-center mb-8">
						<button
							onClick={handleAiSummary}
							disabled={loading}
							className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform transition hover:scale-105"
						>
							{loading ? (
								<>
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
									Analyzing...
								</>
							) : (
								<>
									<PlayCircle className="w-5 h-5" />
									Analyze System Logs
								</>
							)}
						</button>
					</div> */}

					{/* Error Alert */}
					{error && (
						<div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm">
							<div className="flex items-start gap-3">
								<XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
								<div>
									<h3 className="font-semibold text-red-900">Error</h3>
									<p className="text-red-700 mt-1">{error}</p>
								</div>
							</div>
						</div>
					)}

					{/* Loading State */}
					{loading && (
						<div className="bg-white rounded-xl shadow-lg p-8 text-center">
							<div className="flex flex-col items-center gap-4">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
								<p className="text-gray-600">Analyzing events with AI...</p>
							</div>
						</div>
					)}

					{/* Analysis Results */}
					{analysis && !loading && (
						<div className="space-y-6">
							{/* Error/Warning Banner if present */}
							{analysis.error && (
								<div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 shadow-sm">
									<div className="flex items-start gap-3">
										<AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
										<div>
											<h3 className="font-semibold text-yellow-900">
												Partial Analysis
											</h3>
											<p className="text-yellow-700 mt-1">{analysis.error}</p>
											{analysis.parse_error && (
												<p className="text-sm text-yellow-600 mt-2">
													Technical details: {analysis.parse_error}
												</p>
											)}
										</div>
									</div>
								</div>
							)}

							{/* Overall Status Card */}
							<div className="text-center mb-8">
								<div className="flex items-center justify-center gap-3 mb-4">
									<Activity className="w-10 h-10 text-indigo-600" />
									<h1 className="text-4xl font-bold text-gray-900">
										System Log Analyzer
									</h1>
								</div>
								<p className="text-lg text-gray-600">
									AI-powered event analysis!
								</p>
							</div>
							<div
								className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${getSeverityConfig(analysis.severity).border}`}
							>
								<div className="p-6">
									<div className="flex items-start justify-between mb-4">
										<div className="flex items-center gap-3">
											<Settings className="w-8 h-8 text-indigo-600" />
											<h2 className="text-2xl font-bold text-gray-900">
												System Status
											</h2>
										</div>
										<div
											className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getSeverityConfig(analysis.severity).bg} ${getSeverityConfig(analysis.severity).color} font-semibold`}
										>
											{React.createElement(
												getSeverityConfig(analysis.severity).icon,
												{ className: "w-5 h-5" },
											)}
											{analysis.severity}
										</div>
									</div>

									<div className="flex items-center gap-2 text-gray-600 mb-4">
										<Clock className="w-4 h-4" />
										<span className="text-sm">
											{analysis.time_range_analyzed}
										</span>
									</div>

									<p className="text-gray-700 mb-6 leading-relaxed">
										{analysis.summary?.key_findings}
									</p>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4">
											<div className="flex items-center gap-2 text-gray-600 mb-2">
												<FileText className="w-4 h-4" />
												<span className="text-sm font-medium">
													Total Events
												</span>
											</div>
											<div className="text-3xl font-bold text-indigo-600">
												{analysis.summary?.total_events}
											</div>
										</div>
										<div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
											<div className="flex items-center gap-2 text-gray-600 mb-2">
												<BarChart3 className="w-4 h-4" />
												<span className="text-sm font-medium">Event Types</span>
											</div>
											<div className="text-3xl font-bold text-purple-600">
												{analysis.summary?.event_types?.length || 0}
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Risk Assessment */}
							{analysis.risk_assessment && (
								<div className="bg-white rounded-xl shadow-lg p-6">
									<div className="flex items-center gap-3 mb-6">
										<Shield className="w-6 h-6 text-indigo-600" />
										<h3 className="text-xl font-bold text-gray-900">
											Risk Assessment
										</h3>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
										<div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200">
											<div className="flex items-center gap-2 text-gray-600 mb-2">
												<Zap className="w-4 h-4" />
												<span className="text-sm font-medium">
													Crash Probability
												</span>
											</div>
											<div
												className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${getSeverityConfig(analysis.risk_assessment.crash_probability).bg} ${getSeverityConfig(analysis.risk_assessment.crash_probability).color} font-semibold text-sm`}
											>
												{analysis.risk_assessment.crash_probability}
											</div>
										</div>

										<div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200">
											<div className="flex items-center gap-2 text-gray-600 mb-2">
												<TrendingUp className="w-4 h-4" />
												<span className="text-sm font-medium">
													Performance Impact
												</span>
											</div>
											<div className="font-semibold text-gray-900">
												{analysis.risk_assessment.performance_impact}
											</div>
										</div>

										<div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200">
											<div className="flex items-center gap-2 text-gray-600 mb-2">
												<Database className="w-4 h-4" />
												<span className="text-sm font-medium">
													Data Integrity
												</span>
											</div>
											<div className="font-semibold text-gray-900">
												{analysis.risk_assessment.data_integrity}
											</div>
										</div>
									</div>

									{analysis.risk_assessment.security_concerns?.length > 0 && (
										<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
											<div className="flex items-start gap-3">
												<AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
												<div>
													<h4 className="font-semibold text-yellow-900 mb-2">
														Security Concerns
													</h4>
													<ul className="space-y-1">
														{analysis.risk_assessment.security_concerns.map(
															(concern, idx) => (
																<li
																	key={idx}
																	className="text-yellow-800 text-sm"
																>
																	{concern}
																</li>
															),
														)}
													</ul>
												</div>
											</div>
										</div>
									)}
								</div>
							)}

							{/* Events Breakdown */}
							{analysis.events_breakdown &&
								analysis.events_breakdown.length > 0 && (
									<div className="bg-white rounded-xl shadow-lg p-6">
										<div className="flex items-center gap-3 mb-6">
											<FileText className="w-6 h-6 text-indigo-600" />
											<h3 className="text-xl font-bold text-gray-900">
												Events Breakdown
											</h3>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
											{analysis.events_breakdown.map((event, idx) => {
												const config = getSeverityConfig(event.severity);
												return (
													<div
														key={idx}
														className={`border ${config.border} rounded-lg p-4 hover:shadow-md transition-shadow`}
													>
														<div className="flex items-start justify-between mb-3">
															<span className="font-semibold text-gray-900 text-sm">
																{event.event_type}
															</span>
															<div
																className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${config.bg} ${config.color}`}
															>
																{React.createElement(config.icon, {
																	className: "w-3 h-3",
																})}
																{event.severity} ({event.count})
															</div>
														</div>
														<p className="text-gray-700 text-sm mb-2">
															{event.description}
														</p>
														<div className="flex items-start gap-2 text-xs text-gray-600 italic">
															<Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
															<span>{event.why_logged}</span>
														</div>
													</div>
												);
											})}
										</div>
									</div>
								)}

							{/* Anomalies */}
							{analysis.anomalies && analysis.anomalies.length > 0 && (
								<div className="bg-white rounded-xl shadow-lg p-6">
									<div className="flex items-center gap-3 mb-6">
										<AlertCircle className="w-6 h-6 text-red-600" />
										<h3 className="text-xl font-bold text-gray-900">
											Detected Anomalies
										</h3>
									</div>

									<div className="space-y-4">
										{analysis.anomalies.map((anomaly, idx) => {
											const config = getSeverityConfig(anomaly.severity);
											return (
												<div
													key={idx}
													className={`bg-gradient-to-r ${config.bg} border-1 ${config.border} rounded-lg p-4`}
												>
													<div className="flex items-start justify-between mb-2">
														<h4 className="font-semibold text-gray-900">
															{anomaly.type}
														</h4>
														<span
															className={`px-3 py-1 rounded-full text-xs font-semibold ${config.color} bg-white border ${config.border}`}
														>
															{anomaly.severity}
														</span>
													</div>
													<p className="text-gray-700 mb-2">
														{anomaly.description}
													</p>
													{anomaly.first_occurrence && (
														<div className="flex items-center gap-2 text-sm text-gray-600">
															<Clock className="w-4 h-4" />
															First seen:{" "}
															{new Date(
																anomaly.first_occurrence,
															).toLocaleString()}
														</div>
													)}
												</div>
											);
										})}
									</div>
								</div>
							)}

							{/* Recommended Actions */}
							{analysis.recommended_actions &&
								analysis.recommended_actions.length > 0 && (
									<div className="bg-white rounded-xl shadow-lg p-6">
										<div className="flex items-center gap-3 mb-6">
											<Target className="w-6 h-6 text-green-600" />
											<h3 className="text-xl font-bold text-gray-900">
												Recommended Actions
											</h3>
										</div>

										<div className="space-y-4">
											{analysis.recommended_actions.map((action, idx) => {
												const priorityConfig = getPriorityConfig(
													action.priority,
												);
												const isExpanded = expandedActions[idx];

												return (
													<div
														key={idx}
														className="border border-gray-200 rounded-lg overflow-hidden"
													>
														<div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4">
															<div className="flex items-center gap-2 mb-3 flex-wrap">
																<span
																	className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${priorityConfig.bg} ${priorityConfig.color} border ${priorityConfig.border}`}
																>
																	{action.priority} PRIORITY
																</span>
																<div className="flex items-center gap-1 text-sm text-gray-600">
																	<Clock className="w-4 h-4" />
																	{action.estimated_time}
																</div>
																<div className="flex items-center gap-1 text-sm text-gray-600">
																	<BarChart3 className="w-4 h-4" />
																	{action.difficulty}
																</div>
															</div>

															<button
																onClick={() => toggleAction(idx)}
																className="w-full flex items-center justify-between text-left group"
															>
																<h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
																	{action.action} - Click Me!
																</h4>
																{isExpanded ? (
																	<ChevronUp className="w-5 h-5 text-gray-400" />
																) : (
																	<ChevronDown className="w-5 h-5 text-gray-400" />
																)}
															</button>
														</div>

														{isExpanded && (
															<div className="p-4 space-y-4">
																<div>
																	<h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
																		<Lightbulb className="w-4 h-4 text-yellow-600" />
																		Steps to resolve
																	</h5>
																	<ol className="space-y-2">
																		{action.steps.map((step, stepIdx) => (
																			<li key={stepIdx} className="flex gap-3">
																				<span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold">
																					{stepIdx + 1}
																				</span>
																				<span className="text-gray-700 pt-0.5">
																					{step}
																				</span>
																			</li>
																		))}
																	</ol>
																</div>

																{action.resources &&
																	action.resources.length > 0 && (
																		<div>
																			<h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
																				<BookOpen className="w-4 h-4 text-indigo-600" />
																				Helpful Resources
																			</h5>
																			<div className="space-y-2">
																				{action.resources.map(
																					(resource, resIdx) => {
																						const ResourceIcon =
																							getResourceIcon(resource.type);
																						return (
																							<a
																								key={resIdx}
																								href={resource.url}
																								target="_blank"
																								rel="noopener noreferrer"
																								className="flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors group"
																							>
																								<ResourceIcon className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
																								<div className="flex-1 min-w-0">
																									<div className="font-medium text-indigo-600 group-hover:text-indigo-700 flex items-center gap-2">
																										{resource.title}
																										<ExternalLink className="w-3 h-3" />
																									</div>
																									<p className="text-sm text-gray-600 mt-1">
																										{resource.relevance}
																									</p>
																								</div>
																							</a>
																						);
																					},
																				)}
																			</div>
																		</div>
																	)}
															</div>
														)}
													</div>
												);
											})}
										</div>
									</div>
								)}

							{/* System Health */}
							{analysis.system_health && (
								<div className="bg-white rounded-xl shadow-lg p-6">
									<div className="flex items-center gap-3 mb-6">
										<Cpu className="w-6 h-6 text-green-600" />
										<h3 className="text-xl font-bold text-gray-900">
											System Health Overview
										</h3>
									</div>

									<p className="text-gray-700 mb-6 leading-relaxed">
										{analysis.system_health.overall_status}
									</p>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{analysis.system_health.concerns?.length > 0 && (
											<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
												<div className="flex items-center gap-2 mb-3">
													<AlertTriangle className="w-5 h-5 text-yellow-600" />
													<h4 className="font-semibold text-yellow-900">
														Concerns
													</h4>
												</div>
												<ul className="space-y-2">
													{analysis.system_health.concerns.map(
														(concern, idx) => (
															<li
																key={idx}
																className="text-yellow-800 text-sm flex gap-2"
															>
																<span className="text-yellow-600">•</span>
																<span>{concern}</span>
															</li>
														),
													)}
												</ul>
											</div>
										)}

										{analysis.system_health.positive_indicators?.length > 0 && (
											<div className="bg-green-50 border border-green-200 rounded-lg p-4">
												<div className="flex items-center gap-2 mb-3">
													<CheckCircle className="w-5 h-5 text-green-600" />
													<h4 className="font-semibold text-green-900">
														Positive Indicators
													</h4>
												</div>
												<ul className="space-y-2">
													{analysis.system_health.positive_indicators.map(
														(indicator, idx) => (
															<li
																key={idx}
																className="text-green-800 text-sm flex gap-2"
															>
																<span className="text-green-600">•</span>
																<span>{indicator}</span>
															</li>
														),
													)}
												</ul>
											</div>
										)}
									</div>
								</div>
							)}

							{/* Prevention Tips */}
							{analysis.prevention_tips &&
								analysis.prevention_tips.length > 0 && (
									<div className="bg-white rounded-xl shadow-lg p-6">
										<div className="flex items-center gap-3 mb-6">
											<Shield className="w-6 h-6 text-blue-600" />
											<h3 className="text-xl font-bold text-gray-900">
												Prevention Tips
											</h3>
										</div>
										<ul className="space-y-3">
											{analysis.prevention_tips.map((tip, idx) => (
												<li key={idx} className="flex gap-3 text-gray-700">
													<Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
													<span>{tip}</span>
												</li>
											))}
										</ul>
									</div>
								)}

							{/* Next Monitoring Focus */}
							{analysis.next_monitoring_focus &&
								analysis.next_monitoring_focus.length > 0 && (
									<div className="bg-white rounded-xl shadow-lg p-6">
										<div className="flex items-center gap-3 mb-6">
											<Eye className="w-6 h-6 text-purple-600" />
											<h3 className="text-xl font-bold text-gray-900">
												What to Monitor Next
											</h3>
										</div>
										<ul className="space-y-3">
											{analysis.next_monitoring_focus.map((focus, idx) => (
												<li key={idx} className="flex gap-3 text-gray-700">
													<Target className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
													<span>{focus}</span>
												</li>
											))}
										</ul>
									</div>
								)}

							{/* Metadata */}
							{analysis.metadata && (
								<div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200">
									<p className="text-sm text-gray-600 text-center">
										Analysis completed at{" "}
										{new Date(analysis.metadata.analyzed_at).toLocaleString()} •{" "}
										{analysis.metadata.events_count} events analyzed • Model:{" "}
										{analysis.metadata.model_used}
									</p>
								</div>
							)}
						</div>
					)}
				</div>
			</div>

			{machineIdState ? (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="flex items-center justify-center"
				>
					<div className="bg-white border-2 w-[90vw] border-blue-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
						<div className="flex items-center gap-3 mb-6">
							<div className="p-3 bg-gradient-to-br from-blue-200 to-blue-100 rounded-lg">
								<Zap className="w-6 h-6 text-blue-700" />
							</div>
							<div>
								<h2 className="text-2xl font-bold text-slate-900">
									Configure Machine ID
								</h2>
								<p className="text-sm text-slate-600 mt-1">
									Set up your system for monitoring
								</p>
							</div>
						</div>

						<div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
							<p className="text-slate-700 mb-3">
								Refer the Installation Guide to locate the machine-Id
							</p>
							<motion.button
								whileHover={{ scale: 1.02, translateX: 4 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => Navigate("/installation-guide")}
								className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
							>
								View Installation Guide
								<ChevronRight size={18} />
							</motion.button>
						</div>

						<div className="space-y-4">
							<input
								type="text"
								placeholder="Enter Machine-Id (UUID v4)"
								onChange={handleChange}
								value={mId}
								className={`w-full text-black px-4 py-3 rounded-lg border-2 font-mono text-sm focus:outline-none transition-all ${
									isValid
										? "border-emerald-300 bg-emerald-50"
										: error
											? "border-red-300 bg-red-50"
											: "border-slate-300 bg-white"
								}`}
							/>
							{error && (
								<motion.p
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className="text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg"
								>
									{error}
								</motion.p>
							)}
							{isValid && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg"
								>
									<CheckCircle2 size={16} />
									Valid Machine-Id
								</motion.div>
							)}
							<motion.button
								whileHover={{ scale: isValid ? 1.02 : 1 }}
								whileTap={{ scale: 0.98 }}
								onClick={handlePatch}
								disabled={!isValid}
								className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
							>
								Update Machine
							</motion.button>
						</div>
					</div>
				</motion.div>
			) : (
				<></>
			)}
		</div>
	);
}

export default Dashboard;

