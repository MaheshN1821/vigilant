const PrivacyPolicyModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
			<div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
				{/* Header */}
				<div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center text-blue-600 dark:text-blue-400">
					<div className="flex items-center gap-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04 inter-4.016 11.955 11.955 0 01-3.898 7.433c1.464 3.363 4.619 5.54 8.126 5.54s6.662-2.177 8.126-5.54a11.955 11.955 0 01-3.898-7.433z"
							/>
						</svg>
						<h2 className="text-2xl font-bold text-slate-800 dark:text-white">
							Privacy Policy
						</h2>
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
				<div className="p-8 overflow-y-auto">
					<div className="space-y-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
						<p className="text-base text-slate-700 dark:text-slate-200">
							Your privacy is our highest priority. We follow a{" "}
							<strong>Privacy-by-Design</strong> approach in developing the
							Vigilant Agent.
						</p>

						<section className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-lg">
							<h3 className="font-bold text-slate-800 dark:text-white mb-2">
								Encryption & Security
							</h3>
							<p>
								All data transmitted from the agent to our servers is protected
								by 256-bit AES encryption via HTTPS. We use industry-standard
								hashing for all account credentials.
							</p>
						</section>

						<section>
							<h3 className="font-bold text-slate-800 dark:text-white mb-2">
								No Third-Party Sharing
							</h3>
							<p>
								Vigilant does not sell, lease, or share your system metrics with
								advertisers or third-party data brokers. Your data is used
								exclusively for your own diagnostic dashboard.
							</p>
						</section>

						<section>
							<h3 className="font-bold text-slate-800 dark:text-white mb-2">
								Offline Privacy
							</h3>
							<p>
								Data collected while the system is offline remains encrypted in
								a local cache and is only uploaded once a secure connection is
								re-established.
							</p>
						</section>

						<section>
							<h3 className="font-bold text-slate-800 dark:text-white mb-2">
								Data Retention
							</h3>
							<p>
								Metrics are stored for a period of 30 days to provide historical
								trends, after which they are automatically anonymized or
								deleted.
							</p>
						</section>
					</div>
				</div>

				{/* Footer */}
				<div className="px-8 py-5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
					<span className="text-xs text-slate-400 font-mono italic">
						SECURE CONNECTION VERIFIED
					</span>
					<button
						onClick={onClose}
						className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition-all active:scale-95"
					>
						I Understand
					</button>
				</div>
			</div>
		</div>
	);
};

export default PrivacyPolicyModal;
