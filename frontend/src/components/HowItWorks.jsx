import { motion } from "framer-motion";
import {
	Download,
	Database,
	Cloud,
	BarChart3,
	Eye,
	ArrowRight,
} from "lucide-react";

export default function HowItWorks() {
	const steps = [
		{
			number: "01",
			title: "Agent Installation",
			description:
				"Install the Vigilant agent once. Runs as a background service. Uses native system APIs.",
			icon: Download,
			bgColor: "bg-emerald-50",
			borderColor: "border-emerald-200",
			iconColor: "text-emerald-700",
			accentColor: "text-emerald-600",
		},
		{
			number: "02",
			title: "Local Data Collection",
			description:
				"Metrics and events are collected in real time. Data is buffered safely on disk. No data loss during network outages.",
			icon: Database,
			bgColor: "bg-sky-50",
			borderColor: "border-sky-200",
			iconColor: "text-sky-700",
			accentColor: "text-sky-600",
		},
		{
			number: "03",
			title: "Secure Data Transmission",
			description:
				"Telemetry is sent periodically to the Vigilant backend. Efficient batching minimizes network usage.",
			icon: Cloud,
			bgColor: "bg-blue-50",
			borderColor: "border-blue-200",
			iconColor: "text-blue-700",
			accentColor: "text-blue-600",
		},
		{
			number: "04",
			title: "Time-Windowed Analysis",
			description:
				"Recent system activity is analyzed in short time windows. Patterns, anomalies, and trends are detected.",
			icon: BarChart3,
			bgColor: "bg-indigo-50",
			borderColor: "border-indigo-200",
			iconColor: "text-indigo-700",
			accentColor: "text-indigo-600",
		},
		{
			number: "05",
			title: "Insights & Visualization",
			description:
				"Results are made available through the dashboard. Users get clarity, not raw logs.",
			icon: Eye,
			bgColor: "bg-violet-50",
			borderColor: "border-violet-200",
			iconColor: "text-violet-700",
			accentColor: "text-violet-600",
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.12,
				delayChildren: 0.15,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 25 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: "easeOut" },
		},
	};

	return (
		<section
			id="how-it-works"
			className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden"
		>
			{/* Background elements - soft and subtle */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute top-1/3 -left-40 w-80 h-80 bg-emerald-300/10 rounded-full blur-3xl"></div>
				<div
					className="absolute bottom-1/4 -right-40 w-80 h-80 bg-violet-300/10 rounded-full blur-3xl"
					style={{ animationDelay: "0s" }}
				></div>
			</div>

			<div className="max-w-5xl mx-auto">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					viewport={{ once: true }}
					className="text-center space-y-6 mb-20"
				>
					<h2 className="text-5xl md:text-6xl font-bold leading-tight text-slate-900">
						How <span className="text-emerald-600">Vigilant Works</span>
					</h2>
					<p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
						Built for confidence, without complexity. Five straightforward steps
						from installation to insight.
					</p>
				</motion.div>

				{/* Timeline Steps */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="space-y-6"
				>
					{steps.map((step, idx) => {
						const Icon = step.icon;
						return (
							<motion.div
								key={idx}
								variants={itemVariants}
								className="group relative"
							>
								<div className="flex gap-6 items-stretch">
									{/* Left indicator column */}
									<div className="flex flex-col items-center flex-shrink-0">
										{/* Step circle */}
										<motion.div
											whileHover={{ scale: 1.1, rotate: -5 }}
											whileTap={{ scale: 0.95 }}
											transition={{
												type: "spring",
												stiffness: 300,
												damping: 15,
											}}
											className={`relative w-16 h-16 rounded-full ${step.bgColor} ${step.borderColor} border-2 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 cursor-pointer`}
										>
											<Icon className={`w-8 h-8 ${step.iconColor}`} />
										</motion.div>

										{/* Vertical connector line */}
										{idx < steps.length - 1 && (
											<motion.div
												initial={{ scaleY: 0, opacity: 0 }}
												whileInView={{ scaleY: 1, opacity: 1 }}
												transition={{ duration: 0.6, delay: idx * 0.12 + 0.3 }}
												viewport={{ once: true }}
												className={`w-0.5 h-20 mt-3 bg-gradient-to-b from-slate-300 to-slate-200`}
											></motion.div>
										)}
									</div>

									{/* Right content column */}
									<div className="flex-1 pt-1 pb-6">
										<motion.div
											whileHover={{ translateX: 8, translateY: -4 }}
											transition={{
												duration: 0.3,
												type: "spring",
												stiffness: 300,
											}}
											className="group/card relative"
										>
											{/* Card */}
											<div
												className={`relative ${step.bgColor} ${step.borderColor} border-2 rounded-2xl p-7 transition-all duration-300 group-hover/card:shadow-lg`}
											>
												{/* Content */}
												<div className="space-y-3">
													<div className="flex items-baseline gap-3">
														<motion.span
															initial={{ opacity: 0, scale: 0.8 }}
															whileInView={{ opacity: 1, scale: 1 }}
															transition={{
																duration: 0.4,
																delay: idx * 0.12 + 0.15,
															}}
															viewport={{ once: true }}
															className={`text-5xl mr-4 font-bold ${step.accentColor}`}
														>
															{step.number}
														</motion.span>
														<h3
															className={`text-3xl font-bold text-slate-900 group-hover/card:${step.accentColor} transition-colors duration-300`}
														>
															{step.title}
														</h3>
													</div>
													<p className="text-slate-700 leading-relaxed text-md group-hover/card:text-slate-800 transition-colors duration-300">
														{step.description}
													</p>
												</div>

												{/* Arrow indicator */}
												<motion.div
													initial={{ opacity: 0, x: -5 }}
													whileHover={{ opacity: 1, x: 2 }}
													transition={{ duration: 0.3 }}
													className={`absolute top-6 right-6 ${step.accentColor} opacity-30 group-hover/card:opacity-100 transition-opacity`}
												>
													<ArrowRight size={20} strokeWidth={2} />
												</motion.div>
											</div>
										</motion.div>
									</div>
								</div>
							</motion.div>
						);
					})}
				</motion.div>

				{/* Bottom Summary */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.5 }}
					viewport={{ once: true }}
					className="mt-24 pt-12 border-t-2 border-slate-200"
				>
					<div className="relative group">
						<div className="relative bg-gradient-to-br from-slate-100 to-slate-50 border-2 border-slate-300 rounded-3xl p-12 text-center transition-all duration-300">
							<p className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
								<span className="text-emerald-600">Vigilant</span> is
								observability, not intervention.
							</p>
							<p className="text-slate-700 text-lg leading-relaxed max-w-2xl mx-auto">
								See the warning signs before they become catastrophes. <br />{" "}
								Clarity in seconds, not hours.
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

