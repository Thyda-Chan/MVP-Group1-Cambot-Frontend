import Input from "@/app/documents/components/Input";
import React, { useState, useEffect } from "react";

interface User {
  userId: string;
  user_name: string;
  employee_id: string;
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

  const inputFields = [
    {
      label: "Name",
      value: updatedUser.user_name,
      name: "user_name",
    },
    {
      label: "employeeId",
      value: updatedUser.employee_id,
      name: "employee_id",
    },
    {
      label: "Role",
      value: updatedUser.role,
      name: "role",
    },
    {
      label: "Status",
      value: updatedUser.status,
      name: "status",
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl w-96 text-[#015D7F]">
        <h2 className="text-xl font-semibold mb-4">Update User Info</h2>

        <div className="space-y-4">
          {inputFields.map(({ label, value, name }) => (
            <Input
              label={label}
              name={label}
              value={value}
              onChange={handleChange}
            />
          ))}

          <div className="flex justify-end gap-4 mt-4">
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
