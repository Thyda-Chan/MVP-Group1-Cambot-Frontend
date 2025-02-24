"use client";
import React, { useState } from "react";
import { ArrowDownUp, Search, Trash2 } from "lucide-react";
import Header from "../chatbot/components/header";

const USERS_PER_PAGE = 5;

export default function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Emily Johnson",
      email: "emily.johnson92@cambot.com",
      roles: ["Admin", "Manager"],
      status: "Active",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john.doe@cambot.com",
      roles: ["Staff"],
      status: "Offline",
    },
    {
      id: 3,
      name: "Alice Smith",
      email: "alice.smith@cambot.com",
      roles: ["Staff"],
      status: "Active",
    },
    {
      id: 4,
      name: "Michael Smith",
      email: "michael.smith87@cambot.com",
      roles: ["Manager"],
      status: "Offline",
    },
    {
      id: 5,
      name: "Sarah Connor",
      email: "sarah.connor@cambot.com",
      roles: ["Staff"],
      status: "Active",
    },
    {
      id: 6,
      name: "David Lee",
      email: "david.lee@cambot.com",
      roles: ["Staff"],
      status: "Offline",
    },
    {
      id: 7,
      name: "Emma Watson",
      email: "emma.watson@cambot.com",
      roles: ["Staff"],
      status: "Active",
    },
    {
      id: 8,
      name: "Robert Brown",
      email: "robert.brown@cambot.com",
      roles: ["Manager"],
      status: "Offline",
    },
    {
      id: 9,
      name: "Sophia Miller",
      email: "sophia.miller@cambot.com",
      roles: ["Staff"],
      status: "Active",
    },
    {
      id: 10,
      name: "James Anderson",
      email: "james.anderson@cambot.com",
      roles: ["Staff"],
      status: "Offline",
    },
    {
      id: 11,
      name: "Olivia Rodrigo",
      email: "olivia.rodrigo@cambot.com",
      roles: ["Admin"],
      status: "Active",
    },
    {
      id: 12,
      name: "William White",
      email: "william.white@cambot.com",
      roles: ["Manager"],
      status: "Offline",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(users.length / USERS_PER_PAGE);
  const indexOfFirstUser = (currentPage - 1) * USERS_PER_PAGE;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfFirstUser + USERS_PER_PAGE
  );

  const deleteUser = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const isActive = (user: { status: string }) => {
    return user.status.toLowerCase() === "active"
      ? "bg-green"
      : "bg-orange-400";
  };

  const userRoles = (role: string) => {
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
  };

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<string>("name");

  const sortUsers = (p: string) => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "status") {
        const statusA = a.status.toLowerCase() === "active" ? 1 : 0;
        const statusB = b.status.toLowerCase() === "active" ? 1 : 0;
        return sortOrder === "asc" ? statusB - statusA : statusA - statusB;
      }
      return 0;
    });

    setUsers(sortedUsers);
    setSortBy(p);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh-64px)] min-w-full p-6 space-y-6 text-primary bg-gradient-to-b from-white to-[#62C9F1]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold">User Management</h1>
            <p className="text-gray-500 text-sm">
              Check users' info and add new users
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2">
              <div className="text-xl">Sort</div>
              <ArrowDownUp />
            </button>
            <div className="flex justify-between py-2 px-5 border rounded-3xl w-72 gap-2 bg-white focus:outline">
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
            <UserButton />
          </div>
        </div>
        <div className="min-h-[68vh] text-primary flex flex-col bg-white shadow-xl border border-gray-300 rounded-2xl p-6 w-full">
          {/* Header Row */}
          <div className="grid grid-cols-4 w-full py-2 font-semibold border-b-2 border-gray-300 text-center">
            <button
              onClick={() => sortUsers("name")}
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
          {/* User List */}
          <div>
            {displayedUsers.map((user, index) => (
              <div
                key={user.id}
                className="grid grid-cols-4 w-full py-4 items-center border-b-2 border-gray-300 text-center"
              >
                <div className="flex items-center justify-start">
                  <div className="w-10 h-10 mx-4 border bg-gray-200 rounded-full flex justify-center items-center">
                    {user.name[0]}
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm">{user.email}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {user.roles.map((role, index) => (
                    <div
                      key={index}
                      className={`w-28 px-4 text-white rounded-3xl ${userRoles(
                        role
                      )}`}
                    >
                      {role}
                    </div>
                  ))}
                </div>

                <div className="flex gap-x-4 justify-center">
                  <div
                    className={`${isActive(
                      user
                    )} rounded-full w-6 flex justify-center items-center`}
                  >
                    <div className="bg-white rounded-full w-3 h-3"></div>
                  </div>
                  <div>{user.status}</div>
                </div>

                <div className="flex justify-center gap-8">
                  <button className="px-4 py-2 bg-green text-white rounded-3xl">
                    Update
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="p-2 bg-gray-100 rounded-md"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          <div>Displaying page</div>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 bg-gray-200 rounded-md"
          >
            Prev
          </button>
          <span>
            {currentPage} / {totalPage}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPage))
            }
            className="px-4 bg-gray-200 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

const UserButton = () => {
  return (
    <button className="bg-green hover:bg-[#4a7412] text-white rounded-3xl px-4 py-2">
      Add User
    </button>
  );
};
