import { CloudUpload } from "lucide-react";
import React, { useState } from "react";

export default function SearchDoc({ placeholder }: { placeholder: string }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedUsers = filteredDocs.slice(
    indexOfFirstUser,
    indexOfFirstUser + USERS_PER_PAGE
  );

  return (
    <div className="flex gap-4">
      <input
        type="search"
        placeholder="Search User"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="focus:outline-none w-full"
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
