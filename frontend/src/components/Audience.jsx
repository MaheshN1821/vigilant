import { motion } from "framer-motion";
import { User, Code, Lock, Beaker, Users } from "lucide-react";

export default function Audience() {
	const audiences = [
		{
			icon: User,
			title: "Power Users",
			description: "Want insight into their systems",
			color: "from-blue-500 to-blue-600",
		},
		{
			icon: Code,
			title: "Developers",
			description: "Diagnosing crashes or instability",
			color: "from-purple-500 to-purple-600",
		},
		{
			icon: Lock,
			title: "Security-Conscious Users",
			description: "Monitoring system integrity",
			color: "from-red-500 to-red-600",
		},
		{
			icon: Beaker,
			title: "Researchers & Students",
			description: "Studying system behavior",
			color: "from-green-500 to-green-600",
		},
		{
			icon: Users,
			title: "Teams",
			description: "Needing endpoint observability",
			color: "from-yellow-500 to-yellow-600",
		},
	];

	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto space-y-16">
				{/* Section Title */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center space-y-4"
				>
					<h2 className="text-4xl md:text-5xl font-bold">Who Is This For?</h2>
					<p className="text-lg text-gray-400 max-w-2xl mx-auto">
						Vigilant serves diverse users and use cases
					</p>
				</motion.div>

				{/* Audiences Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
					{audiences.map((audience, idx) => {
						const Icon = audience.icon;
						return (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: idx * 0.08 }}
								viewport={{ once: true }}
								className="group"
							>
								<div className="relative h-full bg-slate-800/50 border border-slate-800 rounded-lg p-6 hover:border-blue-500/50 smooth-transition overflow-hidden cursor-pointer">
									{/* Hover gradient */}
									<div className="absolute inset-0 opacity-0 group-hover:opacity-10 smooth-transition bg-gradient-to-br from-blue-500 via-transparent to-transparent"></div>

									<div className="relative z-10 space-y-4 flex flex-col h-full">
										{/* Icon */}
										<motion.div
											whileHover={{ scale: 1.15, rotate: -10 }}
											transition={{ duration: 0.3 }}
											className={`w-14 h-14 rounded-lg bg-gradient-to-br ${audience.color} flex items-center justify-center`}
										>
											<Icon className="w-7 h-7 text-white" />
										</motion.div>

										{/* Title */}
										<h3 className="text-lg font-bold">{audience.title}</h3>

										{/* Description */}
										<p className="text-gray-400 text-sm flex-1">
											{audience.description}
										</p>

										{/* Arrow indicator */}
										<motion.div
											initial={{ opacity: 0, x: -10 }}
											whileHover={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3 }}
											className="text-blue-400 text-sm font-semibold"
										>
											Learn more →
										</motion.div>
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
