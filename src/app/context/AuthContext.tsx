"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { set } from "react-hook-form";

interface AuthContextType {
  role: any;
  token: any;
  login: (token: string, RefreshToken: string, role: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<any>(null);
  const [refreshToken, setRefreshToken] = useState<any>(null);
  const [role, setRole] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedRole = localStorage.getItem("role");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const login = (token: string, RefreshToken: string, role: string) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", RefreshToken);
    localStorage.setItem("role", role);

    setToken({ token });
    setRole({ role });
    router.push("/chatbot");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");

    setToken(null);
    setRole(null);
    setRefreshToken(null);

    set;
    router.push("/signInUser");
  };

  return (
    <AuthContext.Provider
      value={{ role, token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Error AuthProvider");
  }
  return context;
};
