import React from "react";

export default function Input({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-md"
      />
    </div>
  );
}
