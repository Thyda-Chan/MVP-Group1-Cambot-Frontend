import React from "react";

export default function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        id="title"
        type="text"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-md"
      />
    </div>
  );
}
