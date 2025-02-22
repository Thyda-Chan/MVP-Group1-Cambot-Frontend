import React from "react";

export default function Searchbar() {
  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Search for objects, contents, documents etc."
        className="py-4 px-5 border rounded-2xl flex-grow"
      />
      <button className="px-4 py-2 bg-darkblue text-white rounded-xl">
        Search
      </button>
    </div>
  );
}
