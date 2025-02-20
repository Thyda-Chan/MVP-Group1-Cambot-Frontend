interface InputProps {
  label: string;
  placeholder?: string;
  name: string;
  type?: string;
  register: any;
  errors: any;
}

export default function Input({
  label,
  placeholder,
  name,
  type = "text",
  register,
  errors,
}: InputProps) {
  return (
    <div>
      <label className="block font-medium">{label} *</label>
      <input
        type={type}
        {...register(name, { required: `${label} is required` })}
        className="w-full p-2 border rounded-lg text-[#9ca3af]"
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
}
