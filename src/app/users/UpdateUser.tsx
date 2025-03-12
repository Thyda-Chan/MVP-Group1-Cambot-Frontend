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

const UpdateUser: React.FC<UpdateUser> = ({ user, onClose, onUpdate }) => {
  const [updatedUser, setUpdatedUser] = useState<User>(user);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdate(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl w-96">
        <h2 className="text-xl font-semibold mb-4">Update User Info</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Name</label>
          <input
            type="text"
            name="user_name"
            value={updatedUser.user_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            value={updatedUser.employee_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Role</label>
          <input
            type="text"
            name="role"
            value={updatedUser.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Status</label>
          <input
            type="text"
            name="status"
            value={updatedUser.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
