import { motion } from "framer-motion";
import ctaimage from "../assets/images/logo-4.png";
import { Download, BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTA() {
	const Navigate = useNavigate();

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	return (
		<section
			className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30 bg-cover"
			style={{ backgroundImage: `url(${ctaimage})` }}
		>
			<div className="w-full flex items-center justify-start">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="max-w-4xl space-y-12 flex flex-col ml-5 flex-end"
				>
					{/* Title */}
					<motion.h2
						variants={itemVariants}
						className="text-4xl md:text-5xl font-bold text-balance"
					>
						Get Started in Minutes
					</motion.h2>

					{/* Steps */}
					<motion.div variants={itemVariants} className="space-y-4">
						{[
							"Download the Vigilant agent",
							"Install and configure once!",
							"Access your dashboard",
							"Start understanding your system",
						].map((step, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4, delay: idx * 0.1 }}
								viewport={{ once: true }}
								className="flex items-center gap-4 justify-start"
							>
								<span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">
									{idx + 1}
								</span>
								<p className="text-lg font-bold text-white">{step}</p>
							</motion.div>
						))}
					</motion.div>

					{/* CTA Buttons */}
					<motion.div
						variants={itemVariants}
						className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
					>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg smooth-transition"
						>
							<Download size={20} />
							Download Agent
						</motion.button>

						<motion.button
							onClick={() => Navigate("/installation-guide")}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="flex items-center cursor-pointer justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-blue-500/30 font-semibold rounded-lg smooth-transition"
						>
							<BookOpen size={20} />
							Installation Guide
						</motion.button>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
