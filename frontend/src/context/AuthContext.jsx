import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);

    // Helper to fetch user by user_id
    const fetchUser = async (userId) => {
        const response = await axiosInstance.get(`/api/user/${userId}`);
        setUser(response.data);
    };

    const initializeAuth = async () => {
        const storedToken = localStorage.getItem("token");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        try {
            if (storedToken) {
                const decoded = jwtDecode(storedToken);
                const isExpired = decoded.exp * 1000 < Date.now();

                if (isExpired && storedRefreshToken) {
                    await refreshToken(); // also fetches user
                } else if (!isExpired) {
                    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
                    await fetchUser(decoded.user_id);
                } else {
                    logout();
                }
            } else if (storedRefreshToken) {
                await refreshToken();
            } else {
                logout();
            }
        } catch (error) {
            console.error("Auth initialization failed:", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initializeAuth();
    }, []);

    // Smart refresh based on token expiry
    useEffect(() => {
        const scheduleRefresh = () => {
            const storedToken = localStorage.getItem("token");
            if (!storedToken) return;

            const decoded = jwtDecode(storedToken);
            const expiresIn = decoded.exp * 1000 - Date.now();
            const refreshBefore = expiresIn - 60 * 1000; // 1 min before expiry

            if (refreshBefore > 0) {
                const timeout = setTimeout(refreshToken, refreshBefore);
                return () => clearTimeout(timeout);
            } else {
                refreshToken();
            }
        };

        const cancel = scheduleRefresh();
        return cancel;
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await axiosInstance.post("/api/token/", {
                username,
                password,
            });

            const { access, refresh } = response.data;

            localStorage.setItem("token", access);
            localStorage.setItem("refreshToken", refresh);
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;
            setToken(access);

            const decoded = jwtDecode(access);
            await fetchUser(decoded.user_id);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        delete axiosInstance.defaults.headers.common["Authorization"];
        setUser(null);
        setToken(null);
    };

    const refreshToken = async () => {
        try {
            const refresh = localStorage.getItem("refreshToken");
            if (!refresh) {
                logout();
                return;
            }

            const response = await axiosInstance.post("/api/token/refresh/", {
                refresh,
            });

            const newAccess = response.data.access;
            localStorage.setItem("token", newAccess);
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
            setToken(newAccess);

            const decoded = jwtDecode(newAccess);
            await fetchUser(decoded.user_id);
        } catch (error) {
            console.error("Token refresh failed:", error);
            logout();
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
