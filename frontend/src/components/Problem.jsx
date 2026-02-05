import { motion } from "framer-motion";
import { AlertCircle, Eye, Zap, TrendingUp } from "lucide-react";
import Signals from "./Signals";

export default function Problem() {
	const painPoints = [
		{ icon: AlertCircle, text: "Logs are verbose but not meaningful" },
		{ icon: Eye, text: "Issues are discovered after damage is done" },
		{ icon: TrendingUp, text: "Users don't know why something went wrong" },
		{ icon: Zap, text: "Raw data ≠ understanding" },
	];

	const signals = [
		"CPU spikes",
		"Memory pressure",
		"Disk bottlenecks",
		"Repeated system or security events",
		"Hardware warnings",
		"Authentication failures",
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.08,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: "easeOut" },
		},
	};

	return (
		<section
			className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
			style={{ backgroundColor: "white" }}
		>
			{/* Animated background elements */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute top-40 -left-96 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
				<div
					className="absolute bottom-40 -right-96 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "1s" }}
				></div>
			</div>

			<div className="max-w-7xl mx-auto space-y-20">
				{/* Main Title Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center space-y-6 max-w-3xl mx-auto"
				>
					<h2 className="text-5xl md:text-6xl font-bold leading-tight text-black">
						Modern systems don't fail{" "}
						<span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
							silently
						</span>{" "}
						— but users rarely see the warning signs
					</h2>
					<p className="text-xl text-black/100 leading-relaxed max-w-2xl mx-auto">
						System failures leave signals. The challenge isn't detecting
						them—it's understanding them in time.
					</p>
				</motion.div>

				{/* Signals Section */}
				<Signals />

				{/* Pain Points Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					viewport={{ once: true }}
					className="space-y-8"
				>
					<div className="space-y-3 text-center">
						<p className="text-sm font-bold text-red-500 uppercase tracking-widest">
							Critical Issues
						</p>
						<h3 className="text-4xl font-bold text-black">The Challenge</h3>
						<p className="text-black/100 text-lg">
							These problems compound when visibility is fragmented:
						</p>
					</div>

					{/* <div className="grid md:grid-cols-2 gap-6"> */}
					<div className="flex flex-wrap flex-row gap-2 sm:gap-6 align-items justify-center">
						{painPoints.map((point, idx) => {
							const Icon = point.icon;
							return (
								<motion.div
									key={idx}
									initial={{ opacity: 0, x: -30 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6, delay: idx * 0.12 }}
									viewport={{ once: true }}
									whileHover={{ translateX: 12 }}
									className="group relative w-[250px] sm:w-[210px] m-4"
								>
									<div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
									<div className="relative flex flex-col h-[240px] flex-wrap align-items justify-center gap-5 bg-gradient-to-br from-red-500/50 to-red-900/50 backdrop-blur-sm border border-red-500/30 group-hover:border-red-500/30 rounded-2xl p-7 transition-all duration-300">
										<motion.div
											whileHover={{ rotate: -15, scale: 1.2 }}
											transition={{ duration: 0.3 }}
											className="flex-shrink-0 mt-1 w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-300"
										>
											<Icon className="w-6 h-6 text-red-600" />
										</motion.div>
										<p className="text-white leading-relaxed text-lg group-hover:text-gray-100 transition-colors duration-300 pt-1">
											{point.text}
										</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
