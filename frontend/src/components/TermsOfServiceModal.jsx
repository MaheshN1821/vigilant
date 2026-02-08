const TermsOfServiceModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
			<div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
				{/* Header */}
				<div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
					<div>
						<h2 className="text-2xl font-bold text-slate-800 dark:text-white">
							Terms of Service
						</h2>
						<p className="text-xs text-slate-500 mt-1">
							Version 1.0 • Last updated Feb 2026
						</p>
					</div>
					<button
						onClick={onClose}
						className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-slate-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* Content */}
				<div className="p-8 overflow-y-auto custom-scrollbar">
					<div className="space-y-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
						<section>
							<h3 className="text-base font-bold text-slate-800 dark:text-white mb-2">
								1. Service Scope
							</h3>
							<p>
								Vigilant provides system monitoring via a local background
								agent. It collects metrics (CPU, RAM, Disk) and system events to
								provide health insights.{" "}
								<strong>
									Vigilant is a diagnostic tool and does not perform system
									repairs.
								</strong>
							</p>
						</section>

						<section>
							<h3 className="text-base font-bold text-slate-800 dark:text-white mb-2">
								2. Data Collection
							</h3>
							<ul className="list-disc ml-5 space-y-1">
								<li>
									<span className="text-green-600 font-medium">Included:</span>{" "}
									Resource utilization, crash logs, and hardware telemetry.
								</li>
								<li>
									<span className="text-red-600 font-medium">Excluded:</span>{" "}
									Personal files, browser history, keystrokes, and screen
									recordings.
								</li>
							</ul>
						</section>

						<section>
							<h3 className="text-base font-bold text-slate-800 dark:text-white mb-2">
								3. Agent Operation
							</h3>
							<p>
								The agent runs as a Windows Service. It starts automatically
								with the OS to ensure continuous monitoring. You may stop or
								uninstall the agent at any time to cease data collection.
							</p>
						</section>

						<section>
							<h3 className="text-base font-bold text-slate-800 dark:text-white mb-2">
								4. User Responsibilities
							</h3>
							<p>
								You agree to install the agent only on authorized systems and
								will not attempt to reverse-engineer the telemetry protocol for
								malicious purposes.
							</p>
						</section>
					</div>

					<div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
						<p className="text-indigo-700 dark:text-indigo-400 font-medium text-center italic">
							"Vigilant monitors your system to help you understand problems —
							it never watches you."
						</p>
					</div>
				</div>

				{/* Footer */}
				<div className="px-8 py-5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-right">
					<button
						onClick={onClose}
						className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md transition-all active:scale-95"
					>
						I Accept These Terms
					</button>
				</div>
			</div>
		</div>
	);
};

export default TermsOfServiceModal;
