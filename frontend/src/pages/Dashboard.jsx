import { useEffect, useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import { validate } from "uuid";

function Dashboard() {
	const userName = localStorage.getItem("vigilant-username") || "User";
	const machineId = localStorage.getItem("vigilant-machineId") || "";
	const token = localStorage.getItem("vigilant-token");
	const email = localStorage.getItem("vigilant-email");
	const Navigate = useNavigate();

	const [eventData, setEventData] = useState([]);
	const [metricData, setMetricData] = useState({
		cpu: {},
		disk: {},
		memory: {},
	});

	useEffect(() => {
		if (!token) {
			return Navigate("/auth");
		}
	}, []);

	useEffect(() => {
		const getData = async () => {
			try {
				if (machineId) {
					const evntRes = await api.get(
						`/api/analytics/${machineId}?window=${7200000}`,
					);
					const metricRes = await api.get(
						`/api/analytics/metrics/${machineId}?window=${7200000}`,
					);
					setEventData(evntRes?.data?.eventIdInsights);
					setMetricData(metricRes?.data?.summary);
				}
			} catch (err) {
				// console.log(err);
			}
		};
		getData();
	}, []);

	const [mId, setMId] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (e) => {
		const value = e.target.value.trim();
		setMId(value);

		if (value === "") {
			setIsValid(false);
			setError("");
			return;
		}

		const valid = validate(value);
		setIsValid(valid);
		setError(
			valid
				? ""
				: "Enter valid UUID v4 (e.g., 16b62c84-a524-4462-86dd-8a09a2de6a41)",
		);
	};

	const handlePatch = async () => {
		if (!isValid || !mId) {
			alert("Invalid Machine-Id!");
			return;
		}
		try {
			const res = await api.patch(`/api/configure/machine-id/${mId}`, {
				email: email,
			});
			// console.log(res);
		} catch (err) {
			// console.log(err);
		}
	};

	return (
		<main
			style={{ backgroundColor: "white", color: "black" }}
			className="w-[100vw] h-[100vh]"
		>
			<nav>Welcome, {userName}!</nav>
			<div>
				<h1>Configure Machine Id </h1>
				<p>
					Refer the Installation Guide to locate the machine-Id{" "}
					<span
						className="border border-black cursor-pointer"
						onClick={() => Navigate("/installation-guide")}
					>
						Click here for guide!
					</span>
				</p>
				<div>
					<div>
						<input
							type="text"
							placeholder="Enter Machine-Id"
							onChange={handleChange}
							value={mId}
							style={{
								borderColor: isValid ? "green" : error ? "red" : "gray",
							}}
						/>
						{error && (
							<p style={{ color: "red", fontSize: "0.9em" }}>{error}</p>
						)}
						{isValid && <p style={{ color: "green" }}>✓ Valid Machine-Id</p>}
						<button onClick={handlePatch} disabled={!isValid}>
							Update Machine
						</button>
					</div>
				</div>
			</div>
			<div>
				<h1>Events insights:</h1>
				<div>
					{eventData.map((event, index) => (
						<div key={index + 1}>
							<span>Event Id: {event?.eventId}</span>
							<span>Event Name: {event?.name}</span>
							<span>Severity: {event?.severity}</span>
							<span>Count : {event?.count}</span>
						</div>
					))}
				</div>
				<div>Click me for Ai analysis</div>
				<div
					onClick={() => Navigate("/dashboard/events")}
					className="cursor-pointer"
				>
					Click me for detailed overview
				</div>
			</div>
			<div>
				<h1>Metrics insights:</h1>
				<div>
					<span>Cpu utilization: {metricData?.cpu?.avg}</span>
					<span>Memory: {metricData?.memory?.avg}</span>
					<span>Disk: {metricData?.disk?.avg}</span>
				</div>
				<div>Click me for Ai analysis</div>
				<div
					onClick={() => Navigate("/dashboard/metrics")}
					className="cursor-pointer"
				>
					Click me for detailed overview
				</div>
			</div>
		</main>
	);
}

export default Dashboard;
