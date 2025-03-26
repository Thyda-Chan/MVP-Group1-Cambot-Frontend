"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) return;
    router.push("/signInUser");
  }, []);

  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export const RoleGuard = ({ children }: { children: React.ReactNode }) => {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role !== "admin" && role !== "manager") {
      router.push("/");
    }
  }, []);

  if (role !== "admin" && role !== "manager") return null;

  return <>{children}</>;
};
