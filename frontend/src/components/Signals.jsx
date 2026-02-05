import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Cpu,
	Database,
	Activity,
	AlertTriangle,
	ShieldAlert,
	HardDrive,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

const signals = [
	{
		title: "CPU Spikes",
		tagline: "The system's sudden gasps for air.",
		whisper: "Unexpected Bursts",
		description:
			"Your processor hits its limits due to runaway tasks or resource-hungry applications.",
		techId: "PerfMon: % Processor Time",
		insight:
			"We reveal the frequency and culprits behind these surges, distinguishing blips from chronic strain.",
		icon: <Cpu size={50} className="text-cyan-400" />,
	},
	{
		title: "Memory Pressure",
		tagline: "When your RAM is crying out for space.",
		whisper: "Silent Suffocation",
		description:
			"Applications hoarding RAM, leading to slower performance and potential OOM crashes.",
		techId: "Event ID 2004 (Resource-Exhaustion)",
		insight:
			"We track usage trends to predict imminent slowdowns before they impact your users.",
		icon: <Activity size={50} className="text-purple-400" />,
	},
	{
		title: "Disk Bottlenecks",
		tagline: "The digital traffic jam slowing everything.",
		whisper: "Frustrating Freezes",
		description:
			"Storage devices failing to keep up with I/O requests, making the OS feel unresponsive.",
		techId: "Event ID 129 (Reset to device)",
		insight:
			"We pinpoint failing hardware or I/O-intensive processes before data corruption occurs.",
		icon: <HardDrive size={50} className="text-blue-400" />,
	},
	{
		title: "System Events",
		tagline: "The OS speaking in cryptic warnings.",
		whisper: "Hidden Instability",
		description:
			"Critical messages indicating unexpected shutdowns or core component failures.",
		techId: "Event ID 6008 (Unexpected Shutdown)",
		insight:
			"We translate cryptic codes into actionable steps, preventing catastrophic system failures.",
		icon: <Database size={50} className="text-green-400" />,
	},
	{
		title: "Hardware Warnings",
		tagline: "Your components signaling distress.",
		whisper: "Impending Failure",
		description:
			"Early alerts from drives (SMART errors) or memory modules on the verge of breakdown.",
		techId: "Event ID 17 (WHEA-Logger)",
		insight:
			"We give you a heads-up to back up and replace before data loss becomes inevitable.",
		icon: <AlertTriangle size={50} className="text-amber-400" />,
	},
	{
		title: "Auth Failures",
		tagline: "The unwelcome knocking at your door.",
		whisper: "Security Alarms",
		description:
			"Repeated failed login attempts or unusual access patterns indicating a breach.",
		techId: "Event ID 4625 (Logon Failure)",
		insight:
			"We differentiate typos from targeted attacks, securing your system from unauthorized access.",
		icon: <ShieldAlert size={50} className="text-red-400" />,
	},
];

const SignalCard = ({ signal }) => {
	const [isFlipped, setIsFlipped] = useState(false);

	return (
		<div
			className="relative w-80 h-96 cursor-pointer perspective-1000"
			onClick={() => setIsFlipped(!isFlipped)}
		>
			<motion.div
				className="w-full h-full relative preserve-3d transition-all duration-500"
				initial={false}
				animate={{ rotateY: isFlipped ? 180 : 0 }}
				transition={{ duration: 0.6, animationDirection: "normal" }}
			>
				{/* Front Side */}
				{/* <div className="absolute w-full h-full backface-hidden bg-slate-900 border border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl"> */}
				<div className="absolute w-full h-full backface-hidden bg-[#40bedd] border border-[#40bedd] rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl">
					<div className="mb-6 p-4 bg-slate-800 rounded-full border border-slate-700 shadow-inner">
						{signal.icon}
					</div>
					<h3 className="text-3xl font-bold text-white mb-2">{signal.title}</h3>
					<p className="text-slate text-md italic">"{signal.tagline}"</p>
					<div className="mt-8 text-md text-white font-mono tracking-widest uppercase">
						Click to Unmask
					</div>
				</div>

				{/* Back Side */}
				<div className="absolute w-full h-full backface-hidden bg-slate-800 border border-cyan-500/30 rounded-2xl p-8 flex flex-col justify-between shadow-cyan-500/10 shadow-2xl rotate-y-180">
					<div>
						<h4 className="text-cyan-400 font-bold uppercase tracking-tighter text-sm mb-1">
							The Whisper: {signal.whisper}
						</h4>
						<p className="text-slate-200 text-sm leading-relaxed mb-4">
							{signal.description}
						</p>
						<div className="bg-slate-900/50 p-3 rounded border border-slate-700 mb-4">
							<span className="text-[10px] text-slate-300 uppercase block mb-1">
								Source Identifier
							</span>
							<code className="text-xs text-cyan-300 font-mono">
								{signal.techId}
							</code>
						</div>
					</div>
					<div className="border-t border-slate-700 pt-4">
						<span className="text-xs font-bold text-white block mb-1">
							Vigilant's Insight:
						</span>
						<p className="text-xs text-slate-300 leading-snug">
							{signal.insight}
						</p>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default function Signals() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev + 1) % signals.length);
	};

	const prevSlide = () => {
		setCurrentIndex((prev) => (prev - 1 + signals.length) % signals.length);
	};

	return (
		<section className="py-16 -mt-[20px] bg-[#81d4e9] overflow-hidden rounded-2xl">
			<div className="max-w-6xl mx-auto">
				<div className="flex flex-row flex-wrap items-center w-full justify-center">
					<div className="mb-8 md:mb-16 text-center w-[90%] lg:w-[40vw] m-4">
						<h2 className="text-3xl md:text-5xl font-bold text-[#145e71] mb-6 leading-tight">
							These signals already exist in your system.
						</h2>
						<p className="text-xl text-slate max-w-3xl mx-auto leading-relaxed">
							But they're scattered across logs, hard to interpret, and easy to
							ignore.
							<br />
							<span className="text-[#145e71] font-semibold ml-2 underline decoration-cyan-500/30">
								Vigilant brings them to light.
							</span>
						</p>
					</div>

					<div className="m-4">
						<div className="relative flex items-center justify-center gap-8">
							<button
								onClick={prevSlide}
								className="p-3 rounded-full bg-[#1f94b2] border border-[#1f94b2] text-white hover:bg-cyan-500 transition-colors z-10 hidden md:block"
								// className="p-3 rounded-full bg-cyan-500 border border-[#1f94b2] text-white hover:bg-cyan-500 transition-colors z-10 hidden md:block"
							>
								<ChevronLeft size={24} />
							</button>

							<div className="flex gap-6 items-center justify-center overflow-visible">
								<AnimatePresence mode="wait">
									<motion.div
										key={currentIndex}
										initial={{ opacity: 0, x: 50 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -50 }}
										transition={{ duration: 0.4 }}
									>
										<SignalCard signal={signals[currentIndex]} />
									</motion.div>
								</AnimatePresence>
							</div>

							<button
								onClick={nextSlide}
								className="p-3 rounded-full bg-[#1f94b2] border border-[#1f94b2] text-white hover:bg-cyan-500 transition-colors z-10 hidden md:block"
							>
								<ChevronRight size={24} />
							</button>
						</div>

						{/* Mobile Controls */}
						<div className="flex justify-center gap-4 mt-8 md:hidden">
							<button
								onClick={prevSlide}
								className="p-3 rounded-full bg-[#1f94b2] border border-[#1f94b2] text-white"
							>
								<ChevronLeft size={20} />
							</button>
							<button
								onClick={nextSlide}
								className="p-3 rounded-full bg-[#1f94b2] border border-[#1f94b2] text-white"
							>
								<ChevronRight size={20} />
							</button>
						</div>

						<div className="flex justify-center gap-2 mt-12">
							{signals.map((_, i) => (
								<div
									key={i}
									className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? "w-8 bg-cyan-500" : "w-2 bg-slate-700"}`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			<style jsx global>{`
				.perspective-1000 {
					perspective: 1000px;
				}
				.preserve-3d {
					transform-style: preserve-3d;
				}
				.backface-hidden {
					backface-visibility: hidden;
				}
				.rotate-y-180 {
					transform: rotateY(180deg);
				}
			`}</style>
		</section>
	);
}
