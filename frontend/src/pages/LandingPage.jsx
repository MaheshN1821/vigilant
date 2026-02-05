import { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Capabilities from "../components/Capabilities";
import Privacy from "../components/Privacy";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function LandingPage() {
	useEffect(() => {
		// Smooth scroll behavior
		document.documentElement.style.scrollBehavior = "smooth";
	}, []);

	return (
		<div className="overflow-x-hidden">
			<Header />
			<main>
				<Hero />
				<Problem />
				<Features />
				<HowItWorks />
				<Capabilities />
				<Privacy />
				<CTA />
			</main>
			<Footer />
		</div>
	);
}
