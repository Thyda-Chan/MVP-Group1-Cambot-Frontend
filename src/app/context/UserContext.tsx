"use client";
import React, {
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LOCALHOST = "http://127.0.0.1:8000";
interface UserContextType {
  loading: boolean;
  user: User[];
  setUserData: (user: SubmissionUser) => void;
  fetchUsers: () => Promise<void>;
  updateUser: (userData: User) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  createUser: (userData: SubmissionUser) => Promise<void>;
  updateUserRole: (userId: string, newRole: string) => Promise<void>;
  setWorkEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  password: string;
  workEmail: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  role: string;
}

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  employeeId: string;
  role: string;
  is_active: boolean;
  updatedAt: Date;
}

interface SubmissionUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  employeeId: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default function UserProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User[]>([]);
  const [userData, setUserData] = useState<SubmissionUser | null>(null);
  const router = useRouter();
  const [workEmail, setWorkEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role")?.toLowerCase();
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${LOCALHOST}/auth/login`, {
        username: workEmail,
        password: password,
      });

      const { accessToken, RefreshToken, role } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", RefreshToken);
      localStorage.setItem("role", role);

      // Update role in state immediately
      setRole(role);

      // Redirect to chatbot page upon login
      router.push("/chatbot");
    } catch (error) {
      console.error(
        "Login Failed",
        (error as any)?.response?.data?.message || "Something went wrong"
      );
    } finally {
      // setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("User is not authenticated");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${LOCALHOST}/user/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const users: User[] = response.data.data
        .map(
          (user: any): User => ({
            userId: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.user_name,
            employeeId: user.employee_id,
            role: user.role,
            password: "",
            is_active: user.is_active,
            updatedAt: new Date(user.updated_at || user.created_at),
          })
        )
        .sort(
          (a: User, b: User) => b.updatedAt.getTime() - a.updatedAt.getTime()
        );

      setUser(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: SubmissionUser) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("User is not authenticated");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${LOCALHOST}/user/`, userData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const newUser: User = {
        userId: "",
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        username: response.data.data.username,
        password: response.data.data.password,
        employeeId: response.data.data.employeeId,
        role: response.data.data.role,
        // is_active: response.data.data.is_active,
        is_active: true,
        updatedAt: response.data.data.updated_at,
      };

      setUser((prevUsers) => [...prevUsers, newUser]);
      await fetchUsers();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        console.error("Axios Error:", errorMessage);
        alert("Invalid: " + errorMessage);
      } else {
        console.error("Unexpected Error:", error);
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData: User) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("User is not authenticated");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `${LOCALHOST}/user/`,
        {
          userId: userData.userId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
          password: userData.password,
          employeeId: userData.employeeId,
          role: userData.role,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUser((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userData.userId ? response.data : user
        )
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        console.error("Axios Error:", errorMessage);
        alert("Invalid: " + errorMessage);
      } else {
        console.error("Unexpected Error:", error);
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("User is not authenticated");
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`${LOCALHOST}/user/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        data: { userId },
      });
      setUser((prevUsers) =>
        prevUsers.filter((user) => user.userId !== userId)
      );

      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("User is not authenticated");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `${LOCALHOST}/auth/change-role`,
        { userId, role: newRole },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUser((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, role: newRole } : user
        )
      );

      alert("User Role Updated Successfully");
    } catch (error) {
      console.error("Error updating user role:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        setUserData,
        fetchUsers,
        updateUser,
        deleteUser,
        createUser,
        updateUserRole,
        setWorkEmail,
        setPassword,
        handleSubmit,
        password,
        workEmail,
        setRole,
        role,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
