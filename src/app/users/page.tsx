"use client";
import React, { useEffect, useState } from "react";
import { ArrowDownUp, Search, Trash2 } from "lucide-react";
import Header from "../chatbot/components/header";
import AddUser from "./components/AddUser";
import { useUser } from "../context/UserContext";
import UpdateUser from "./components/UpdateUser";

export default function Users() {
  const { loading, user, fetchUsers, deleteUser, updateUser } = useUser();
  const [users, setUsers] = useState(user);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<string>("user_name");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const USERS_PER_PAGE = 5;

  // console.log("User data:", user);
  // console.log("role::", user[0].role);

  const filteredUsers = Array.isArray(users)
    ? users.filter(
        (user) =>
          user.username &&
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const sortUsers = (key: string) => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (key === "user_name") {
        return sortOrder === "asc"
          ? a.username.localeCompare(b.username)
          : b.username.localeCompare(a.username);
      } else if (key === "status") {
        const statusA = a.is_active ? 1 : 0;
        const statusB = b.is_active ? 1 : 0;
        return sortOrder === "asc" ? statusB - statusA : statusA - statusB;
      }
      return 0;
    });

    setUsers(sortedUsers);
    setSortBy(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  function userRoles(role: string) {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-pink-600";
      case "manager":
        return "bg-blue-600";
      case "staff":
        return "bg-[#386300]";
      default:
        return "bg-[#386300]";
    }
  }

  const handleUpdateClick = (user: any) => {
    setSelectedUser(user);
    setIsPopupOpen(true);
  };

  const handleUpdate = (updatedUser: any) => {
    // Call your update logic here
    console.log("Updated user:", updatedUser);
  };

  console.log(user);

  const handleDeleteUser = (userId: string) => {
    if (
      window.confirm(`Are you sure you want to delete this user? ${userId}`)
    ) {
      deleteUser(userId).catch((error) => {
        console.error("Error deleting user:", error);
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (Array.isArray(user)) {
      const sortedUsers = [...user].sort((a, b) => {
        return (b.is_active ? 1 : 0) - (a.is_active ? 1 : 0);
      });
      setUsers(sortedUsers);
    }
  }, [user]);

  return (
    <div>
      <div className={open ? "opacity-20" : ""}>
        <Header />
        <div
          className="min-h-[calc(100vh-64px)] min-w-full p-6 space-y-6 text-primary bg-gradient-to-b from-white to-[#62C9F1]"
          {...(open && { onClick: () => setOpen(false) })}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold">User Management</h1>
              <p className="text-gray-500 text-sm">
                Check users' info and add new users
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex justify-between py-2 px-5 border rounded-3xl w-72 gap-2 bg-white">
                <input
                  type="search"
                  placeholder="Search User"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="focus:outline-none w-full"
                />
                <button>
                  <Search />
                </button>
              </div>
              <button
                className="bg-green hover:bg-[#4a7412] text-white rounded-3xl px-4 py-2"
                onClick={() => setOpen((prev) => !prev)}
              >
                Add User
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-[40vh]">
              <div className="w-10 h-10 border-4 border-darkblue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="min-h-[68vh] text-primary flex flex-col bg-white shadow-xl border border-gray-300 rounded-2xl p-6 w-full">
              <div className="grid grid-cols-4 w-full py-2 font-semibold border-b-2 border-gray-300 text-center">
                <button
                  onClick={() => sortUsers("user_name")}
                  className="flex items-center justify-center gap-2"
                >
                  <div>Name</div>
                  <ArrowDownUp size={16} />
                </button>
                <div>User Roles</div>
                <button
                  onClick={() => sortUsers("status")}
                  className="flex items-center justify-center gap-2"
                >
                  <div>Active Status</div>
                  <ArrowDownUp size={16} />
                </button>
              </div>

              <div>
                {displayedUsers.map((user) => (
                  <div
                    key={`${user.userId}-${user.username}`}
                    className="grid grid-cols-4 w-full py-4 items-center border-b-2 border-gray-300 text-center"
                  >
                    <div className="flex items-center justify-start">
                      <div className="w-10 h-10 mx-4 border bg-gray-200 rounded-full flex justify-center items-center">
                        {user.username[0]}
                      </div>
                      <div className="flex flex-col text-left">
                        <div className="font-semibold">{user.username}</div>
                        <div className="text-sm">{user.employeeId}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                      <div
                        className={`w-28 px-4 text-white rounded-3xl ${userRoles(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </div>
                    </div>

                    <div className="flex gap-x-4 justify-center">
                      <div
                        className={`${
                          user.is_active ? "bg-green" : "bg-orange-400"
                        } rounded-full w-6 flex justify-center items-center`}
                      >
                        <div className="bg-white rounded-full w-3 h-3"></div>
                      </div>
                      <div>{user.is_active ? "Active" : "Offline"}</div>
                    </div>

                    <div className="flex justify-center gap-8">
                      <button
                        className="px-4 py-2 bg-green text-white rounded-3xl"
                        onClick={() => handleUpdateClick(user)}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.userId)}
                        className="p-2 bg-gray-100 rounded-md"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center space-x-4 mt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of{" "}
                  {Math.ceil(filteredUsers.length / USERS_PER_PAGE)}
                </span>
                <button
                  disabled={
                    currentPage ===
                    Math.ceil(filteredUsers.length / USERS_PER_PAGE)
                  }
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isPopupOpen && selectedUser && (
        <UpdateUser
          user={selectedUser}
          onClose={() => setIsPopupOpen(false)}
          onUpdate={handleUpdate}
        />
      )}

      <div
        className={`absolute left-40 w-[75%] rounded-2xl ${
          open ? "opacity-100 h-auto" : "opacity-0 h-0"
        } transition-all duration-200 overflow-hidden top-12 right-0`}
      >
        <AddUser />
      </div>
    </div>
  );
}
