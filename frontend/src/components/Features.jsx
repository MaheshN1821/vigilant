import { motion } from "framer-motion";
import { Activity, Brain, BarChart3 } from "lucide-react";

export default function Features() {
	const features = [
		{
			icon: Activity,
			title: "Continuous Monitoring",
			color: "from-blue-500 to-blue-600",
			description:
				"Vigilant runs quietly in the background, collecting performance metrics (CPU, memory, disk, processes) and system, security, hardware, and application events. No manual setup. No user interaction required.",
		},
		{
			icon: Brain,
			title: "Intelligent Correlation",
			color: "from-yellow-500 to-yellow-600",
			description:
				"Instead of treating data in isolation, Vigilant analyzes recent activity in time windows, correlates metrics with events, and detects patterns that indicate risk or degradation. This helps identify early warning signs, not just failures.",
		},
		{
			icon: BarChart3,
			title: "Clear Insights",
			color: "from-green-500 to-green-600",
			description:
				"Vigilant doesn't just record events — it explains them. You'll know what happened, when it happened, how often it's happening, and whether it's normal or unusual behavior.",
		},
	];

	return (
		<section
			id="features"
			className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 border-b border-gray-200"
			// style={{ backgroundColor: "#05161a" }}
		>
			<div className="max-w-7xl mx-auto space-y-16">
				{/* Section Title */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center space-y-4"
				>
					<h2 className="text-4xl md:text-5xl font-bold">
						Vigilant observes, correlates, and explains system behavior
					</h2>
					<p className="text-lg text-gray-300 max-w-2xl mx-auto">
						Continuously, intelligently, and clearly
					</p>
				</motion.div>

				{/* Features Grid */}
				<div className="grid md:grid-cols-3 gap-8">
					{features.map((feature, idx) => {
						const Icon = feature.icon;
						return (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: idx * 0.1 }}
								viewport={{ once: true }}
								className="group relative"
							>
								{/* Card */}
								<div className="relative h-full bg-slate-800/50 border border-slate-800 rounded-lg p-8 hover:border-blue-500/50 smooth-transition overflow-hidden">
									{/* Gradient background on hover */}
									<div className="absolute inset-0 opacity-0 group-hover:opacity-10 smooth-transition bg-gradient-to-br from-blue-500 via-transparent to-transparent"></div>

									<div className="relative z-10 space-y-6">
										{/* Icon */}
										<motion.div
											initial={{ scale: 1, rotate: 0 }}
											whileHover={{ scale: 1.1, rotate: 5 }}
											transition={{ duration: 0.3 }}
											className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center`}
										>
											<Icon className="w-7 h-7 text-white" />
										</motion.div>

										{/* Title */}
										<h3 className="text-2xl font-bold">{feature.title}</h3>

										{/* Description */}
										<p className="text-gray-400 leading-relaxed">
											{feature.description}
										</p>
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
