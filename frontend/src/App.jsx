import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Installation from "./components/Installation";
import Auth from "./pages/AuthPage";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/auth" element={<Auth />} />
			<Route path="/installation-guide" element={<Installation />} />
		</Routes>
	);
}
