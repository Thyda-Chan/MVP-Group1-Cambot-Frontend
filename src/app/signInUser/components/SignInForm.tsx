"use client"; // Mark this component as a Client Component

import React, { useState } from "react";
import InputField from "./InputField";
import { useUser } from "@/app/context/UserContext";

const SignInForm: React.FC = () => {
  const {
    handleSubmit,
    setPassword,
    setWorkEmail,
    password,
    workEmail,
    loading,
  } = useUser();

  return (
    <div className="p-8 w-full">
      <h1 className="text-xl font-bold text-center mb-6">Sign In</h1>{" "}
      {/* Smaller "Sign In" heading */}
      <form onSubmit={handleSubmit}>
        {/* Work Email Field */}
        <InputField
          label="Work Email"
          type="text"
          placeholder={workEmail ? "" : "Type email"} // Placeholder disappears when typing
          value={workEmail}
          onChange={(e) => setWorkEmail(e.target.value)}
        />

        {/* Password Field */}
        <InputField
          label="Password"
          type="password"
          placeholder={password ? "" : "Type password"} // Placeholder disappears when typing
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? "Signing In.." : "Sign In"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">OR</p>
        <button className="text-blue-500 hover:underline">
          Sign in to Admin Account
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
