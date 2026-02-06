import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Installation from "./components/Installation";
import Auth from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Metrics from "./pages/Metrics";
import Events from "./pages/Events";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/auth" element={<Auth />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/dashboard/metrics" element={<Metrics />} />
			<Route path="/dashboard/events" element={<Events />} />
			<Route path="/installation-guide" element={<Installation />} />
		</Routes>
	);
}
