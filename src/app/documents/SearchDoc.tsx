import React from "react";

export default function SearchDoc({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder={placeholder}
        className="py-2 px-5 border rounded-xl flex-grow"
      />
      <select className="p-2 border rounded-xl">
        <option>All departments</option>
      </select>
      <select className="p-2 border rounded-xl">
        <option>Newest to lowest</option>
      </select>
      <button className="px-4 py-2 bg-darkblue text-white rounded-xl">
        Search
      </button>
    </div>
  );
}
