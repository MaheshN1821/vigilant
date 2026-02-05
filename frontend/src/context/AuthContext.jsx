import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(() => localStorage.getItem("token"));
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const clearError = () => setError("");

	// On mount: if token exists, fetch current user
	useEffect(() => {
		const init = async () => {
			try {
				if (token) {
					const { data } = await api.get("http://localhost:3000/api/auth/me");
					setUser(data.user);
				} else {
					setUser(null);
				}
			} catch (err) {
				// token invalid/expired
				localStorage.removeItem("token");
				setToken(null);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		init();
	}, []); // run once on mount

	const handleAuthResponse = ({ token: jwt, user }) => {
		localStorage.setItem("token", jwt);
		setToken(jwt);
		setUser(user);
		setError("");
	};

	const login = async ({ email, password }) => {
		setLoading(true);
		setError("");
		try {
			const { data } = await api.post("http://localhost:3000/api/auth/login", {
				email,
				password,
			});
			handleAuthResponse(data);
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
			const { data } = await api.post(
				"http://localhost:3000/api/auth/register",
				{ name, email, password },
			);
			handleAuthResponse(data);
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
			const { data } = await api.put("http://localhost:3000/api/user/profile", {
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
