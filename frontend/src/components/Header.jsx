import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-scroll";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

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

				<div className="hidden md:flex items-center gap-4">
					<button className="px-4 py-2 text-gray-400 hover:text-white smooth-transition hover:bg-white/5 hover:rounded-lg">
						Sign In
					</button>
					<button className="px-6 py-2 bg-white/10 hover:bg-white/5 text-white rounded-lg font-semibold smooth-transition">
						Get Started
					</button>
				</div>

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
					<div className="flex gap-2 pt-2 border-t border-slate-800/50">
						<button className="flex-1 px-4 py-2 text-gray-200 hover:text-white border border-white/20 rounded-lg">
							Sign In
						</button>
						<button className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/5 text-white rounded-lg font-semibold">
							Get Started
						</button>
					</div>
				</motion.nav>
			)}
		</motion.header>
	);
}
