import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Threads from "./Threads";
import Orb from "./Orb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
	const [showDownload, setShowDownload] = useState(false);
	const Navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem("vigilant-token");
		setShowDownload(!!token);
	}, []);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: "easeOut" },
		},
	};

	return (
		<section className="text-white font-sans pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center relative overflow-hidden">
			{/* Background gradient effect */}
			<div className="absolute inset-0 -z-10 opacity-30">
				<div className="absolute top-20 left-10 w-72 h-72 bg-blue-900 rounded-full filter blur-3xl"></div>
				<div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-900 rounded-full filter blur-3xl"></div>
			</div>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="max-w-7xl mx-auto w-full"
			>
				<div className="text-center space-y-8">
					{/* Badge */}
					<motion.div variants={itemVariants} className="inline-block">
						<span className="px-4 py-2 bg-secondary border border-accent/30 rounded-full text-sm text-accentLight">
							Real-time system observability
						</span>
					</motion.div>

					{/* Main Headline */}
					<motion.h1
						variants={itemVariants}
						className="text-5xl md:text-5xl font-bold leading-tight text-balance"
					>
						Know what's happening
						<br />
						<span className="bg-gradient-to-r from-accent to-accentLight bg-clip-text">
							inside your system
						</span>
						<br />
						before things break
					</motion.h1>

					<div
						style={{
							width: "100%",
							height: "600px",
							position: "absolute",
							top: 80,
							left: 0,
						}}
						className="absolute inset-0 -z-20"
					>
						<Threads amplitude={1} distance={0} enableMouseInteraction />
					</div>

					{/* Subheadline */}
					<motion.p
						variants={itemVariants}
						className="text-lg md:text-xl text-neutral max-w-2xl mx-auto leading-relaxed"
					>
						Vigilant continuously monitors your system's health, performance,
						and critical events to help you detect issues early, understand
						failures clearly, and stay in control.
					</motion.p>

					{/* CTA Buttons */}
					<motion.div
						variants={itemVariants}
						className="flex flex-col sm:flex-row gap-4 justify-center -mt-[4px]"
					>
						<button className="flex items-center justify-center gap-2 px-8 py-4 bg-white/4 hover:bg-accentLight text-white font-semibold rounded-lg smooth-transition">
							Get Started
							<ArrowRight size={20} />
						</button>
						{showDownload ? (
							<a
								href="https://github.com/MaheshN1821/vigilant/releases/download/v1.0.0/vigilant-agent.exe"
								className="flex items-center justify-center gap-2 px-8 py-4 bg-secondary hover:bg-secondary/80 text-white border border-accent/30 font-semibold rounded-lg smooth-transition cursor-pointer"
							>
								<Download size={20} />
								Download Agent
							</a>
						) : (
							<button
								onClick={() => Navigate("/auth")}
								className="flex items-center justify-center gap-2 px-8 py-4 bg-secondary hover:bg-secondary/80 text-white border border-accent/30 font-semibold rounded-lg smooth-transition cursor-pointer"
							>
								<Download size={20} />
								Download Agent
							</button>
						)}
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
