import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useUpload } from "@/app/context/UploadContext";
import { SimpleDocument } from "../page";

interface DeleteButtonProps {
  doc: SimpleDocument;
}

export default function DeleteButton({ doc }: DeleteButtonProps) {
  const { deleteDocument } = useUpload();
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleDeleteClick = (): void => {
    setShowPopup(true);
  };

  const handleConfirmDelete = (): void => {
    deleteDocument(doc.id);
    setShowPopup(false);
  };

  const handleCancelDelete = (): void => {
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
            <p>Are you sure you want to delete this document?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleCancelDelete}
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
