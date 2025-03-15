import { useState } from "react";
import { SimpleDocument } from "../page";
import Input from "./Input";

interface UpdateBoxProps {
  open: boolean;
  onClose: () => void;
  doc: SimpleDocument;
  onSave: (updatedDoc: SimpleDocument) => void;
}

export default function UpdateBox({
  open,
  onClose,
  doc,
  onSave,
}: UpdateBoxProps) {
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
    onClose();
  };

  const inputFields = [
    {
      label: "New Title",
      value: newTitle,
      setter: setNewTitle,
    },
    {
      label: "Document Type",
      value: newDocumentType,
      setter: setNewDocumentType,
    },
    {
      label: "Department",
      value: newDepartment,
      setter: setNewDepartment,
    },
    {
      label: "Admin Name",
      value: newAdminName,
      setter: setNewAdminName,
    },
    {
      label: "Publish Date",
      value: newPublishedDate,
      setter: setNewPublishedDate,
    },
  ];

  return (
    open && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-xl shadow-lg w-1/3">
          <h2 className="text-xl font-semibold mb-4">Edit Document</h2>
          <div className="space-y-4">
            {inputFields.map(({ label, value, setter }) => (
              <div key={label}>
                {label === "Document Type" ? (
                  <select
                    className="p-2 pr-0 border rounded-md w-full"
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                  >
                    <option disabled>All departments</option>
                    <option>Human Resource</option>
                    <option>Marketing</option>
                    <option>Finance</option>
                    <option>Legal</option>
                    <option>IT</option>
                  </select>
                ) : (
                  <Input
                    name={label}
                    label={label}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                  />
                )}
              </div>
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
    )
  );
}
