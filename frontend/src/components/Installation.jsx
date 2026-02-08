import { useState } from "react";
import { motion } from "framer-motion";
import {
	Download,
	Folder,
	Terminal,
	CheckCircle,
	AlertCircle,
	HelpCircle,
	Copy,
	FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Installation() {
	const [copiedCode, setCopiedCode] = useState(null);

	const copyToClipboard = (code, id) => {
		navigator.clipboard.writeText(code);
		setCopiedCode(id);
		setTimeout(() => setCopiedCode(null), 2000);
	};

	const steps = [
		{
			number: "01",
			title: "Download the Agent",
			icon: Download,
			color: "emerald",
			description: "Get your Windows agent from the dashboard",
			details: [
				"Log in to the Vigilant Portal",
				"Click on the Download Agent button to download vigilant-agent.exe",
			],
			code: null,
		},
		{
			number: "02",
			title: "Place the Agent File",
			icon: Folder,
			color: "sky",
			description: "Create a folder and organize your installation",
			details: [
				"Create folder: C:\\Vigilant\\",
				"Move vigilant-agent.exe into that folder",
				"Final path: C:\\Vigilant\\vigilant-agent.exe",
			],
			code: null,
		},
		{
			number: "03",
			title: "Install as Windows Service",
			icon: Terminal,
			color: "blue",
			description: "Set up as a background service (requires Admin)",
			details: [
				"Open Command Prompt as Administrator",
				'Windows + S → Search "Command Prompt"',
				"Right-click → Run as administrator",
			],
			code: null,
		},
		{
			number: "04",
			title: "Create the Service",
			icon: Terminal,
			color: "indigo",
			description: "Register Vigilant with Windows",
			code: 'sc create VigilantAgentService binPath= "C:\\Vigilant\\vigilant-agent.exe"',
			expected: "[SC] CreateService SUCCESS",
		},
		{
			number: "05",
			title: "Configure Auto-Start",
			icon: CheckCircle,
			color: "violet",
			description: "Ensure Vigilant starts automatically on boot",
			code: "sc config VigilantAgentService start= auto",
			expected: "Service configured for auto-start",
		},
		{
			number: "06",
			title: "Start the Service",
			icon: Terminal,
			color: "emerald",
			description: "Activate Vigilant immediately",
			code: "sc start VigilantAgentService",
			expected: "[SC] StartService SUCCESS",
		},
		{
			number: "07",
			title: "Verify Running Status",
			icon: CheckCircle,
			color: "sky",
			description: "Confirm Vigilant is active",
			code: "sc query VigilantAgentService",
			expected: "STATE : 4 RUNNING",
		},
		{
			number: "08",
			title: "Get Your Agent ID",
			icon: FileText,
			color: "blue",
			description: "Locate your unique system identifier",
			details: [
				"Open File Explorer",
				"Navigate to: C:\\ProgramData\\Vigilant\\",
				"Find file named: agent_id",
				"Open with Notepad to view your ID",
			],
			code: null,
		},
		{
			number: "09",
			title: "Link to Dashboard",
			icon: CheckCircle,
			color: "indigo",
			description: "Connect your system to the dashboard",
			details: [
				"Copy the Agent ID from the file",
				"Go to Vigilant Dashboard",
				"Paste your Agent ID",
				'Click "Configure Machine"',
			],
			code: null,
		},
	];

	const colorMap = {
		emerald: {
			bg: "bg-emerald-50",
			border: "border-emerald-200",
			badge: "bg-emerald-100",
			icon: "text-emerald-700",
			number: "text-emerald-600",
		},
		sky: {
			bg: "bg-sky-50",
			border: "border-sky-200",
			badge: "bg-sky-100",
			icon: "text-sky-700",
			number: "text-sky-600",
		},
		blue: {
			bg: "bg-blue-50",
			border: "border-blue-200",
			badge: "bg-blue-100",
			icon: "text-blue-700",
			number: "text-blue-600",
		},
		indigo: {
			bg: "bg-indigo-50",
			border: "border-indigo-200",
			badge: "bg-indigo-100",
			icon: "text-indigo-700",
			number: "text-indigo-600",
		},
		violet: {
			bg: "bg-violet-50",
			border: "border-violet-200",
			badge: "bg-violet-100",
			icon: "text-violet-700",
			number: "text-violet-600",
		},
	};

	const requirements = [
		{ text: "Windows 10 / Windows 11 (64-bit)", icon: "Windows" },
		{ text: "Administrator access", icon: "Lock" },
		{ text: "Internet connection for dashboard sync", icon: "Wifi" },
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
			transition: { duration: 0.5, ease: "easeOut" },
		},
	};

	const Navigate = useNavigate();

	return (
		<main className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
			{/* Subtle background */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute top-1/4 -left-40 w-80 h-80 bg-emerald-300/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-violet-200/10 rounded-full blur-3xl"></div>
			</div>

			<div className="max-w-5xl mx-auto">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					viewport={{ once: true }}
					className="inline-block"
				>
					<span className="absolute top-6 left-28 px-4 py-2 bg-slate-100 border border-slate-300 rounded-full text-sm font-semibold text-slate-700 tracking-wide">
						Installation Guide
					</span>
					<span
						onClick={() => Navigate("/")}
						className="absolute top-6 left-8 cursor-pointer px-4 py-2 bg-slate-100 border border-slate-300 rounded-full text-sm font-semibold text-slate-700 tracking-wide"
					>
						Home
					</span>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					viewport={{ once: true }}
					className="text-center space-y-6 mb-24"
				>
					{/* <motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						viewport={{ once: true }}
						className="inline-block"
					>
						<span className="px-4 py-2 bg-slate-100 border border-slate-300 rounded-full text-sm font-semibold text-slate-700 tracking-wide">
							Installation Guide
						</span>
					</motion.div> */}
					<h1 className="text-5xl md:text-6xl font-bold leading-tight text-slate-900">
						Install <span className="text-emerald-600">Vigilant Agent</span> in
						9 Steps
					</h1>
					<p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
						A clear, step-by-step guide to get Vigilant running as a Windows
						service. <br />
						Takes 2–3 minutes.
					</p>
				</motion.div>

				{/* System Requirements */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.15 }}
					viewport={{ once: true }}
					className="bg-gradient-to-br from-slate-100 to-slate-50 border-2 border-slate-300 rounded-2xl p-8 mb-20"
				>
					<div className="flex items-center gap-3 mb-6">
						<div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center">
							<CheckCircle className="w-6 h-6 text-emerald-700" />
						</div>
						<h2 className="text-2xl font-bold text-slate-900">
							System Requirements
						</h2>
					</div>
					<div className="grid md:grid-cols-3 gap-6">
						{requirements.map((req, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
								viewport={{ once: true }}
								className="flex items-center gap-4 justify-center"
							>
								<div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
									<span className="text-emerald-700 font-bold text-sm">✓</span>
								</div>
								<p className="text-slate-700 font-medium">{req.text}</p>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Steps */}
				<motion.div
					className="space-y-6 mb-20"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{steps.map((step, idx) => {
						const Icon = step.icon;
						const colors = colorMap[step.color];
						return (
							<motion.div key={idx} variants={itemVariants} className="group">
								<motion.div
									whileHover={{ translateY: -4, scale: 1.01 }}
									transition={{ duration: 0.3 }}
									className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-8 transition-all duration-300 group-hover:shadow-lg`}
								>
									<div className="flex flex-col sm:flex-row items-start gap-6">
										{/* Icon and number */}
										<div className="flex-shrink-0">
											<motion.div
												whileHover={{ scale: 1.1, rotate: -5 }}
												className={`${colors.badge} w-16 h-16 rounded-full flex items-center justify-center`}
											>
												<Icon className={`w-8 h-8 ${colors.icon}`} />
											</motion.div>
										</div>

										{/* Content */}
										<div className="flex-1">
											<div className="flex items-baseline gap-3 mb-2">
												<span className={`text-2xl font-bold ${colors.number}`}>
													{step.number}
												</span>
												<h3 className="text-2xl font-bold text-slate-900">
													{step.title}
												</h3>
											</div>
											<p className="text-slate-600 mb-6 text-md group-hover:text-slate-700 transition-colors">
												{step.description}
											</p>

											{/* Details list */}
											{step.details && (
												<ol className="space-y-3 mb-6">
													{step.details.map((detail, dIdx) => (
														<li
															key={dIdx}
															className="flex items-start gap-3 text-slate-700"
														>
															<span
																className={`inline-block w-[12px] h-[12px] rounded-full ${colors.number} flex-shrink-0`}
															>
																{dIdx + 1}.
															</span>
															<span className="text-md font-semibold leading-relaxed">
																{detail}
															</span>
														</li>
													))}
												</ol>
											)}

											{/* Code block */}
											{step.code && (
												<motion.div
													initial={{ opacity: 0, y: 10 }}
													whileInView={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.4 }}
													viewport={{ once: true }}
													className="space-y-3"
												>
													<div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
														<code>{step.code}</code>
													</div>
													<div className="flex w-full items-end justify-end">
														<motion.button
															whileHover={{ scale: 1.05 }}
															whileTap={{ scale: 0.95 }}
															onClick={() => copyToClipboard(step.code, idx)}
															className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg font-semibold transition-colors text-sm"
														>
															<Copy size={16} />
															{copiedCode === idx ? "Copied!" : "Copy"}
														</motion.button>
													</div>
													{step.expected && (
														<div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
															<p className="text-xs font-semibold text-emerald-700 mb-2 uppercase tracking-wide">
																Expected Output:
															</p>
															<code className="text-sm text-emerald-900 font-mono">
																{step.expected}
															</code>
														</div>
													)}
												</motion.div>
											)}
										</div>
									</div>
								</motion.div>
							</motion.div>
						);
					})}
				</motion.div>

				{/* Important Warnings */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.2 }}
					viewport={{ once: true }}
					className="space-y-6 mb-20"
				>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center">
							<AlertCircle className="w-6 h-6 text-red-700" />
						</div>
						<h2 className="text-2xl font-bold text-slate-900">
							Important Warnings
						</h2>
					</div>

					<div className="grid md:grid-cols-2 gap-6">
						{/* Warning 1 */}
						<motion.div
							whileHover={{ translateY: -4, scale: 1.02 }}
							className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-8 transition-all duration-300"
						>
							<div className="flex items-start gap-4">
								<span className="text-2xl font-bold text-rose-700 flex-shrink-0">
									⚠️
								</span>
								<div>
									<h3 className="font-bold text-slate-900 mb-3">
										Do NOT Delete the agent_id File
									</h3>
									<ul className="space-y-2 text-slate-700 text-sm">
										<li>• Uniquely identifies your system</li>
										<li>• Deletion generates a new ID</li>
										<li>• Dashboard loses previous link</li>
									</ul>
								</div>
							</div>
						</motion.div>

						{/* Warning 2 */}
						<motion.div
							whileHover={{ translateY: -4, scale: 1.02 }}
							className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 transition-all duration-300"
						>
							<div className="flex items-start gap-4">
								<span className="text-2xl font-bold text-amber-700 flex-shrink-0">
									⚠️
								</span>
								<div>
									<h3 className="font-bold text-slate-900 mb-3">
										If File is Accidentally Deleted
									</h3>
									<ul className="space-y-2 text-slate-700 text-sm">
										<li>• New Agent ID generated automatically</li>
										<li>• Open the new agent_id file</li>
										<li>• Update ID in dashboard immediately</li>
									</ul>
								</div>
							</div>
						</motion.div>
					</div>
				</motion.div>

				{/* FAQ Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.3 }}
					viewport={{ once: true }}
					className="space-y-6"
				>
					<div className="flex items-center gap-3 mb-8">
						<div className="w-10 h-10 rounded-full bg-violet-200 flex items-center justify-center">
							<HelpCircle className="w-6 h-6 text-violet-700" />
						</div>
						<h2 className="text-2xl font-bold text-slate-900">
							Common Questions
						</h2>
					</div>

					<div className="space-y-4">
						{[
							{
								q: "Does Vigilant survive restart/shutdown?",
								a: "Yes. Once installed, it runs automatically on boot, continues monitoring if user logs out, and resumes data sending when internet returns.",
							},
							{
								q: "Agent not running?",
								a: "Run: sc start VigilantAgentService to restart it.",
							},
							{
								q: "Want to stop the agent?",
								a: "Run: sc stop VigilantAgentService",
							},
							{
								q: "Want to uninstall?",
								a: "Run: sc stop VigilantAgentService, then sc delete VigilantAgentService, then delete C:\\ProgramData\\Vigilant\\",
							},
						].map((faq, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4, delay: 0.3 + idx * 0.08 }}
								viewport={{ once: true }}
								className="bg-gradient-to-br from-violet-50 to-indigo-50 border-2 border-violet-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
							>
								<p className="font-bold text-slate-900 mb-3">{faq.q}</p>
								<p className="text-slate-700 leading-relaxed text-sm">
									{faq.a}
								</p>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Success Message */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.4 }}
					viewport={{ once: true }}
					className="mt-20 text-center"
				>
					<div className="relative group">
						<div className="bg-gradient-to-br from-emerald-100 to-slate-100 border-2 border-emerald-300 rounded-3xl p-12 transition-all duration-300 group-hover:shadow-lg group-hover:border-emerald-400">
							<div className="flex items-center justify-center mb-6">
								<div className="w-16 h-16 rounded-full bg-emerald-200 flex items-center justify-center">
									<CheckCircle className="w-8 h-8 text-emerald-700" />
								</div>
							</div>
							<p className="text-3xl font-bold text-slate-900 leading-tight mb-4">
								Installation Complete!
							</p>
							<p className="text-slate-700 text-lg leading-relaxed max-w-2xl mx-auto">
								Your system is now protected and monitored by Vigilant. If
								anything unusual happens, Vigilant will detect it before it
								becomes a problem and show insights in your dashboard.
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</main>
	);
}
