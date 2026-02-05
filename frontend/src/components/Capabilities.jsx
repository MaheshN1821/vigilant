import { motion } from "framer-motion";
import {
	BarChart3,
	AlertTriangle,
	Lock,
	Zap,
	TrendingUp,
	Clock,
} from "lucide-react";

export default function Capabilities() {
	const capabilities = [
		{
			icon: BarChart3,
			title: "System Health Overview",
			features: [
				"CPU, memory, disk, and process behavior",
				"Trends over time",
				"Short-term spikes vs sustained issues",
			],
		},
		{
			icon: AlertTriangle,
			title: "Event Intelligence",
			features: [
				"Breakdown of system, security, hardware, and application events",
				"Most frequent event IDs",
				"Repeated or unusual activity highlighted",
			],
		},
		{
			icon: Lock,
			title: "Security Awareness",
			features: [
				"Failed login attempts",
				"Authentication anomalies",
				"Account-related system events",
			],
		},
		{
			icon: Zap,
			title: "Power & Hardware Signals",
			features: [
				"Charging and power-related events",
				"Hardware reliability warnings",
				"Device-level alerts surfaced clearly",
			],
		},
		{
			icon: TrendingUp,
			title: "Pattern Discovery",
			features: [
				"Event frequency analysis over time windows",
				"Behavior trending and anomaly detection",
				"Predictive failure pattern correlation",
			],
		},
		{
			icon: Clock,
			title: "Temporal Analysis",
			features: [
				"Understand event timing and sequences",
				"Identify cyclic patterns and outliers",
				"Correlate events with system state changes",
			],
		},
	];

	return (
		<section id="capabilities" className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto space-y-16">
				{/* Section Title */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center space-y-4"
				>
					<h2 className="text-4xl md:text-5xl font-bold text-balance">
						What You'll Learn About Your System
					</h2>
					<p className="text-lg text-gray-400 max-w-2xl mx-auto">
						Complete visibility into system behavior and health
					</p>
				</motion.div>

				{/* Capabilities Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{capabilities.map((cap, idx) => {
						const Icon = cap.icon;
						return (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: idx * 0.08 }}
								viewport={{ once: true }}
								className="group h-full"
							>
								<div className="relative h-full bg-slate-800/50 border border-slate-800 rounded-lg p-6 hover:border-blue-500/50 smooth-transition overflow-hidden flex flex-col">
									{/* Gradient overlay on hover */}
									<div className="absolute inset-0 opacity-0 group-hover:opacity-5 smooth-transition bg-gradient-to-br from-blue-500 via-transparent to-transparent"></div>

									<div className="relative z-10 space-y-4 flex-1 flex flex-col">
										{/* Icon */}
										<motion.div
											whileHover={{ scale: 1.1, rotate: -5 }}
											transition={{ duration: 0.3 }}
											className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center"
										>
											<Icon className="w-6 h-6 text-white" />
										</motion.div>

										{/* Title */}
										<h3 className="text-xl font-bold">{cap.title}</h3>

										{/* Features list */}
										<ul className="space-y-3 flex-1">
											{cap.features.map((feature, fIdx) => (
												<motion.li
													key={fIdx}
													initial={{ opacity: 0, x: -10 }}
													whileInView={{ opacity: 1, x: 0 }}
													transition={{
														duration: 0.4,
														delay: idx * 0.08 + fIdx * 0.05,
													}}
													viewport={{ once: true }}
													className="flex items-start gap-2 text-gray-400 text-sm leading-relaxed"
												>
													<span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2"></span>
													<span>{feature}</span>
												</motion.li>
											))}
										</ul>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
