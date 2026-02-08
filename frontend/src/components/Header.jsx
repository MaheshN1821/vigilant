import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [showDownload, setShowDownload] = useState(false);
	const [showGuide, setShowGuide] = useState(false);
	const Navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("vigilant-token");
		setShowDownload(!!token);
		const machineIDD = localStorage.getItem("vigilant-machineId");
		setShowGuide(!!machineIDD);
	}, []);

	const navLinks = [
		{ label: "Features", to: "features" },
		{ label: "How It Works", to: "how-it-works" },
		{ label: "Capabilities", to: "capabilities" },
		{ label: "Privacy", to: "privacy" },
	];

	return (
		<motion.header
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="fixed top-0 w-full bg-primary/95 backdrop-blur-md z-50 border-b border-white/20"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="text-xl font-bold text-[#f2f2f2]">Vigilant</span>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							spy
							smooth
							duration={500}
							className="text-gray-400 hover:text-white cursor-pointer smooth-transition"
						>
							{link.label}
						</Link>
					))}
				</nav>

				{showDownload ? (
					showGuide ? (
						<button
							onClick={() => Navigate("/installation-guide")}
							className="hidden md:flex px-6 cursor-pointer py-2 bg-white/10 hover:bg-white/5 text-white rounded-lg font-semibold smooth-transition"
						>
							Installation Guide
						</button>
					) : (
						<button
							onClick={() => Navigate("/dashboard")}
							className="hidden md:flex px-6 cursor-pointer py-2 bg-white/10 hover:bg-white/5 text-white rounded-lg font-semibold smooth-transition"
						>
							Dashboard
						</button>
					)
				) : (
					<div className="hidden md:flex items-center gap-4">
						<button
							onClick={() => Navigate("/auth")}
							className="px-4 py-2 text-gray-400 hover:text-white smooth-transition hover:bg-white/5 hover:rounded-lg"
						>
							Sign In
						</button>
						<button
							onClick={() => Navigate("/auth")}
							className="px-6 py-2 bg-white/10 hover:bg-white/5 text-white rounded-lg font-semibold smooth-transition"
						>
							Get Started
						</button>
					</div>
				)}

				{/* Mobile Menu Button */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="md:hidden text-white hover:text-white"
				>
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile Navigation */}
			{isOpen && (
				<motion.nav
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: "auto" }}
					transition={{ duration: 0.3 }}
					className="md:hidden bg-secondary border-t border-secondary/50 px-4 py-4 flex flex-col gap-4"
				>
					{navLinks.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							spy
							smooth
							duration={500}
							onClick={() => setIsOpen(false)}
							className="text-gray-200 hover:text-white cursor-pointer"
						>
							{link.label}
						</Link>
					))}
					{showDownload ? (
						<button
							onClick={() => Navigate("/dashboard")}
							className="px-6 cursor-pointer py-2 bg-white/10 hover:bg-white/5 text-white rounded-lg font-semibold smooth-transition"
						>
							{/* <a href="https://github.com/MaheshN1821/vigilant/releases/download/v1.0.1/vigilant-agent.exe">
								Download
							</a> */}
							Dashboard
						</button>
					) : (
						<div className="hidden md:flex items-center gap-4">
							<button
								onClick={() => Navigate("/auth")}
								className="px-4 py-2 text-gray-400 hover:text-white smooth-transition hover:bg-white/5 hover:rounded-lg"
							>
								Sign In
							</button>
							<button
								onClick={() => Navigate("/auth")}
								className="px-6 py-2 bg-white/10 hover:bg-white/5 text-white rounded-lg font-semibold smooth-transition"
							>
								Get Started
							</button>
						</div>
					)}
				</motion.nav>
			)}
		</motion.header>
	);
}
