import { useUser } from "@/app/context/UserContext";
import Input from "@/app/documents/components/Input";
import React, { useState, useEffect } from "react";

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  employeeId: string;
  password: string;
  role: string;
  status: string;
}

interface UpdateUser {
  user: User;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
}

export default function UpdateUser({ user, onClose, onUpdate }: UpdateUser) {
  const [updatedUser, setUpdatedUser] = useState<User>(user);
  const [error, setError] = useState("");
  const [updatedUserPassword, setUpdatedUserPassword] = useState({
    password: "",
  });

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(updatedUser);
    onClose();
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setUpdatedUser((prev) => ({ ...prev, role: newRole }));
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));

    // password validation
    if (name === "password") {
      const capitalLetterRegex = /[A-Z]/;
      const numberRegex = /[0-9]/;
      if (!capitalLetterRegex.test(value)) {
        setError("Password must contain at least one capital letter.");
      } else if (!numberRegex.test(value)) {
        setError("Password must contain at least one number.");
      } else {
        setError("");
      }
    }
  };

  const inputFields = [
    {
      label: "First Name",
      value: updatedUser.firstName,
      name: "firstName",
    },
    {
      label: "Last Name",
      value: updatedUser.lastName,
      name: "lastName",
    },
    {
      label: "Username",
      value: updatedUser.username,
      name: "username",
    },
    {
      label: "Employee Id",
      value: updatedUser.employeeId,
      name: "employeeId",
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-xl w-96 text-[#015D7F]">
        <h2 className="text-xl font-semibold mb-4">Update User Info</h2>

        <div className="space-y-1">
          {inputFields.map(({ label, value, name }) => (
            <Input
              key={label}
              label={label}
              name={name}
              value={value}
              onChange={handleChange}
            />
          ))}

          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              value={updatedUser.password}
              onChange={handleChangePassword}
              className="w-full p-2 border rounded-md"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="role" className="text-md text-[#015D7F]">
              Role
            </label>
            <select
              name="role"
              value={updatedUser.role}
              onChange={handleSelectChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
