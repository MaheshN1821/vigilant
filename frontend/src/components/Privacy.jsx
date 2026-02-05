import { motion } from "framer-motion";
import { Shield, Eye, Lock, CheckCircle, XCircle } from "lucide-react";

export default function Privacy() {
	const commitments = [
		{
			icon: Shield,
			title: "System Telemetry Only",
			description: "Only system metrics and events are collected—nothing else.",
			color: "emerald",
		},
		{
			icon: Eye,
			title: "No Personal Files",
			description: "Your personal files and documents are never accessed.",
			color: "sky",
		},
		{
			icon: Lock,
			title: "No User Monitoring",
			description: "User activity and content are not monitored.",
			color: "blue",
		},
		{
			icon: CheckCircle,
			title: "Transparent & Auditable",
			description: "Data collection is transparent and fully auditable.",
			color: "violet",
		},
	];

	const notDo = [
		"It does not modify your system",
		"It does not take automated actions",
		"It does not interfere with normal operation",
		"It does not replace antivirus or system tools",
	];

	const colorMap = {
		emerald: {
			bg: "bg-emerald-50",
			border: "border-emerald-200",
			icon: "text-emerald-700",
			badge: "bg-emerald-100",
		},
		sky: {
			bg: "bg-sky-50",
			border: "border-sky-200",
			icon: "text-sky-700",
			badge: "bg-sky-100",
		},
		blue: {
			bg: "bg-blue-50",
			border: "border-blue-200",
			icon: "text-blue-700",
			badge: "bg-blue-100",
		},
		violet: {
			bg: "bg-violet-50",
			border: "border-violet-200",
			icon: "text-violet-700",
			badge: "bg-violet-100",
		},
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: "easeOut" },
		},
	};

	return (
		<section
			id="privacy"
			className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden"
		>
			{/* Subtle background blur */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute top-1/3 -left-40 w-80 h-80 bg-emerald-200/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-violet-200/10 rounded-full blur-3xl"></div>
			</div>

			<div className="max-w-6xl mx-auto">
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					viewport={{ once: true }}
					className="text-center space-y-6 mb-20"
				>
					<h2 className="text-5xl md:text-6xl font-bold leading-tight text-slate-900">
						Your system. Your data.{" "}
						<span className="text-emerald-600">Your control.</span>
					</h2>
					<p className="text-xl text-slate-800 max-w-3xl mx-auto leading-relaxed">
						Vigilant is designed with a least-privilege, read-only philosophy.
						We collect only what matters - system signals that help you
						understand your infrastructure.
					</p>
				</motion.div>

				{/* Commitments Grid */}
				<motion.div
					className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{commitments.map((commitment, idx) => {
						const Icon = commitment.icon;
						const colors = colorMap[commitment.color];
						return (
							<motion.div key={idx} variants={itemVariants} className="group">
								<motion.div
									whileHover={{ translateY: -6, scale: 1.02 }}
									transition={{ duration: 0.3 }}
									className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-8 h-full transition-all duration-300 group-hover:shadow-lg`}
								>
									<motion.div
										whileHover={{ scale: 1.15, rotate: -5 }}
										transition={{ type: "spring", stiffness: 300, damping: 15 }}
										className={`${colors.badge} w-16 h-16 rounded-full flex items-center justify-center mb-6 cursor-pointer`}
									>
										<Icon className={`w-8 h-8 ${colors.icon}`} />
									</motion.div>
									<h3 className="text-lg font-bold text-slate-900 mb-3">
										{commitment.title}
									</h3>
									<p className="text-slate-700 leading-relaxed text-sm group-hover:text-slate-800 transition-colors">
										{commitment.description}
									</p>
								</motion.div>
							</motion.div>
						);
					})}
				</motion.div>

				{/* What Vigilant Does NOT Do */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.2 }}
					viewport={{ once: true }}
					className="mb-16"
				>
					<div className="bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 rounded-3xl p-12">
						<div className="flex items-center gap-3 mb-8">
							<div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center">
								<XCircle className="w-6 h-6 text-rose-700" />
							</div>
							<h3 className="text-2xl font-bold text-slate-900">
								What Vigilant Does Not Do
							</h3>
						</div>
						<div className="grid md:grid-cols-2 gap-6">
							{notDo.map((item, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5, delay: 0.2 + idx * 0.08 }}
									viewport={{ once: true }}
									className="flex items-start gap-4 group/item"
								>
									<span className="text-rose-600 text-xl font-bold flex-shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform">
										✕
									</span>
									<p className="text-slate-700 leading-relaxed group-hover/item:text-slate-900 transition-colors font-medium">
										{item}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</motion.div>

			</div>
		</section>
	);
}
