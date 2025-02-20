"use client";

import Link from "next/link";
import React, { useState } from "react";

const actions = [
  { id: 1, label: "User Profile", route: "/users/users_profile" },
  { id: 2, label: "Setting", route: "/users/setting" },
  { id: 3, label: "Logout", route: "/users/logout" },
];

const UserAreaSelectBox = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-center items-center relative z-10">
        {/* Circle with profile image */}
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="cursor-pointer w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md transform transition-all duration-300 hover:scale-110 active:scale-95" // Added shadow and scale animation
        >
          <img
            src="https://www.mockofun.com/wp-content/uploads/2019/12/circle-photo.jpg" // Your image link
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dropdown menu */}
        <div
          className={`flex flex-col bg-sky-100 w-40 my-2 rounded-lg ${
            open ? "opacity-100 h-auto" : "opacity-0 h-0"
          } transition-all duration-200 overflow-hidden absolute top-12 right-0`}
        >
          {actions.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setOpen(false);
              }}
              className="flex justify-center items-center p-2 hover:bg-sky-300 cursor-pointer"
            >
              <Link href={item.route}>{item.label}</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Background overlay when dropdown is open */}
      <div
        onClick={() => setOpen(false)}
        className={`bg-gray-100 fixed inset-0 opacity-50 z-0 ${open ? "block" : "hidden"}`}
      ></div>
    </>
  );
};

export default UserAreaSelectBox;
