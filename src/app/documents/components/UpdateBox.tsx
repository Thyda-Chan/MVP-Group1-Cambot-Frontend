import { useState } from "react";
import { SimpleDocument } from "../page";

interface UpdateBoxProps {
  open: boolean;
  onClose: () => void;
  doc: SimpleDocument;
  onSave: (updatedDoc: SimpleDocument) => void;
}

const UpdateBox = ({ open, onClose, doc, onSave }: UpdateBoxProps) => {
  const [newTitle, setNewTitle] = useState(doc.name);
  const [newDocumentType, setNewDocumentType] = useState(doc.type);
  const [newDepartment, setNewDepartment] = useState(doc.department);
  const [newAdminName, setNewAdminName] = useState(doc.author);
  const [newPublishedDate, setNewPublishedDate] = useState(doc.date);

  const handleSave = () => {
    const updatedDoc = {
      ...doc,
      name: newTitle,
      type: newDocumentType,
      department: newDepartment,
      author: newAdminName,
      date: newPublishedDate,
    };
    onSave(updatedDoc);
    onClose(); // Close the modal
  };

  return (
    open && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-xl font-semibold mb-4">Edit Document</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Document Type"
              value={newDocumentType}
              onChange={(e) => setNewDocumentType(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Department"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Admin Name"
              value={newAdminName}
              onChange={(e) => setNewAdminName(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="date"
              value={newPublishedDate}
              onChange={(e) => setNewPublishedDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
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
    )
  );
};

export default UpdateBox;
