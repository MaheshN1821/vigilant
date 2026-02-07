import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(() =>
		localStorage.getItem("vigilant-token"),
	);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const clearError = () => setError("");

	const handleAuthResponse = ({ token, user }) => {
		localStorage.setItem("vigilant-token", token);
		localStorage.setItem("vigilant-email", user?.email);
		localStorage.setItem("vigilant-username", user?.name);
		localStorage.setItem("vigilant-userId", user?.userId);
		localStorage.setItem("vigilant-machineId", user?.machineId);
		setToken(token);
		setUser(user);
		setError("");
	};

	const login = async ({ email, password }) => {
		setLoading(true);
		setError("");
		try {
			const data = await api.post("/api/auth/login", {
				email,
				password,
			});
			handleAuthResponse({
				token: data?.data.userData.token,
				user: data?.data.userData.user,
			});
		} catch (err) {
			const msg = err?.response?.data?.message || "Login failed";
			setError(msg);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const register = async ({ name, email, password }) => {
		setLoading(true);
		setError("");
		try {
			const { data } = await api.post("/api/auth/register", {
				name,
				email,
				password,
			});
		} catch (err) {
			const msg = err?.response?.data?.message || "Registration failed";
			setError(msg);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setToken(null);
		setUser(null);
		setError("");
	};

	const updateProfile = async ({ name, email }) => {
		setLoading(true);
		setError("");
		try {
			const { data } = await api.put("/api/user/profile", {
				name,
				email,
			});
			setUser(data.user);
			return data.user;
		} catch (err) {
			const msg = err?.response?.data?.message || "Update failed";
			setError(msg);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const value = useMemo(
		() => ({
			token,
			user,
			loading,
			error,
			clearError,
			login,
			register,
			logout,
			updateProfile,
		}),
		[token, user, loading, error],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
};
