"use client";
import React, {
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import axios from "axios";

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  employeeId: string;
  role: string;
  password: string;
  is_active: boolean;
}

interface SubmissionUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  employeeId: string;
}

interface UserContextType {
  loading: boolean;
  user: User[];
  setUserData: (user: SubmissionUser) => void;
  fetchUsers: () => Promise<void>;
  updateUser: (userData: User) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  createUser: (userData: SubmissionUser) => Promise<void>;
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

  const fetchUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("User is not authenticated");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/user/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const users: User[] = response.data.data.map((user: any) => ({
        userId: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.user_name,
        employeeId: user.employee_id,
        role: user.role,
        password: "",
        is_active: user.is_active,
      }));

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

    console.log("object user:", userData);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/user/",
        userData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("userData.firstName:", userData.firstName);

      console.log("Status:", response.status); // Log status code
      console.log("Response Data:", response.data); // Log the full response

      const newUser: User = {
        firstName: response.data.data.first_name,
        lastName: response.data.data.last_name,
        username: response.data.data.username,
        password: response.data.data.password,
        employeeId: response.data.data.employee_id,
        userId: "",
        role: "",
        is_active: response.data.data.is_active,
      };

      setUser((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected Error:", error);
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
        `http://127.0.0.1:8000/user/`,
        userData,
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
      console.error("Error updating user:", error);
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
      await axios.delete(`http://127.0.0.1:8000/user/`, {
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
