import { motion } from "framer-motion";
import { Github, Mail, Heart } from "lucide-react";

export default function Footer() {
	const links = {
		Product: ["Features", "How It Works", "Pricing", "Security"],
		Resources: ["Documentation", "GitHub", "Blog", "Support"],
	};

	return (
		<footer className="bg-slate-900 border-t border-slate-800/50 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto py-12 space-y-8">
				{/* Top Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="grid md:grid-cols-5 gap-8"
				>
					{/* Brand */}
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<span className="text-lg font-bold">Vigilant</span>
						</div>
						<p className="text-gray-400 text-sm">
							System observability made clear. Detect issues early, understand
							failures deeply.
						</p>
					</div>

					{/* Links */}
					{Object.entries(links).map((category, idx) => (
						<motion.div
							key={category[0]}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: (idx + 1) * 0.1 }}
							viewport={{ once: true }}
							className="space-y-3"
						>
							<h3 className="font-semibold text-white">{category[0]}</h3>
							<ul className="space-y-2">
								{category[1].map((link) => (
									<li key={link}>
										<a
											href="#"
											className="text-gray-400 hover:text-white smooth-transition text-sm"
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</motion.div>

				{/* Divider */}
				<div className="h-px bg-slate-800/50"></div>

				{/* Bottom Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					viewport={{ once: true }}
					className="flex flex-col sm:flex-row items-center justify-between gap-6"
				>
					{/* Copyright */}
					<p className="text-gray-400 text-sm flex items-center gap-1">
						Made with <Heart size={16} className="text-red-500" /> by the
						Vigilant team
					</p>

					{/* Social Links */}
					<div className="flex items-center gap-4">
						<a
							href="#"
							className="w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 flex items-center justify-center smooth-transition"
						>
							<Github size={20} />
						</a>
						<a
							href="#"
							className="w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 flex items-center justify-center smooth-transition"
						>
							<Mail size={20} />
						</a>
					</div>
				</motion.div>

				{/* Disclaimer */}
				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					viewport={{ once: true }}
					className="text-xs text-gray-500 text-center border-t border-slate-800/50 pt-6"
				>
					Vigilant is an observability platform for system monitoring. It does
					not modify, intervene with, or replace system utilities. Use
					responsibly.
				</motion.p>
			</div>
		</footer>
	);
}
