import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteButtonProps {
  userId: string;
  onDelete: (userId: string) => void;
}

export default function DeleteButton({ userId, onDelete }: DeleteButtonProps) {
  const [showPopup, setShowPopup] = useState(false);

  const handleDeleteClick = () => {
    setShowPopup(true);
  };

  const handleConfirmDelete = () => {
    onDelete(userId);
    setShowPopup(false);
  };

  return (
    <div>
      <button onClick={handleDeleteClick} className="p-2 rounded-md bg-red-400">
        <Trash2 color="#ffffff" />
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowPopup(false)}
                className="p-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="p-2 bg-red-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
