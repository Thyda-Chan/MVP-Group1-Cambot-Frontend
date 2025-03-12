"use client"; // Mark this component as a Client Component

import React, { useState } from "react";
import InputField from "./InputField";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignInForm: React.FC = () => {
  const [workEmail, setWorkEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      //this code send post request to backend for login enpoint
      const response = await axios.post("http://127.0.0.1:8000/auth/login", {
        username: workEmail,
        password: password,
      });

      //Handlle the token respone from backend by store in local
      const { accessToken, RefreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", RefreshToken);

      //redirect to chatbot page upon login
      router.push("/chatbot");
    } catch (error) {
      console.error(
        "Login Failed",
        (error as any)?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };
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
          disabled={isLoading}
        >
          {isLoading ? "Signing In.." : "Sign In"}
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
