import React from "react";

export default function Button({
  title,
  isActive,
  onClick,
}: {
  title: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`${
        isActive ? "bg-darkblue text-white" : "bg-white text-darkblue"
      } border border-darkblue rounded-xl text-sm px-2 py-1 transition-colors`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
