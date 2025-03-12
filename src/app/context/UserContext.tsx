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
  user_name: string;
  employee_id: string;
  role: string;
  password: string;
}

interface SubmissionUser {
  firstName: string;
  lastName: string;
  address: string;
  role: string;
  email: string;
  password: string;
}
interface UserContextType {
  loading: boolean;
  user: User[];
  setUserData: (user: SubmissionUser) => void;
  fetchUsers: () => Promise<void>;
  updateUser: (userData: User) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  createUser: (UserCreate: User) => Promise<void>;
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

      setUser(response.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (user: SubmissionUser) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("User is not authenticated");
      return;
    }

    console.log("accessTK:", accessToken);
    console.log("after accessTK data: ", user);

    setLoading(true);
    try {
      const response = await axios.post(`http://127.0.0.1:8000/user/`, user, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      // setUser((prevUser) => [...prevUser, newUser]);
      console.log("inside::: " + JSON.stringify(response));

      // setUser(response.data.data);
    } catch (error) {
      console.error("Error updating user:", error);
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
      await axios.delete(`http://127.0.0.1:8000/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setUser((prevUsers) =>
        prevUsers.filter((user) => user.userId !== userId)
      );
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
