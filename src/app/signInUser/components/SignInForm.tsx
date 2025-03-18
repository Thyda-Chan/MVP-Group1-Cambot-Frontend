"use client";
import React, { useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { Eye, EyeOff } from "lucide-react";

const SignInForm: React.FC = () => {
  const {
    handleSubmit,
    setPassword,
    setWorkEmail,
    password,
    workEmail,
    loading,
  } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-medium text-center text-[#0083B1] mb-6">Sign In</h1>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email/Username Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Work Email or Username
          </label>
          <input
            id="email"
            type="text"
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
            placeholder="Enter email or username"
            className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0083B1] focus:border-[#0083B1]"
            required
          />
        </div>
        
        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 pr-10 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0083B1] focus:border-[#0083B1]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        
        {/* Forgot Password Link */}
        <div className="text-right">
          <a href="#" className="text-sm text-[#0083B1] hover:text-[#007097]">
            Forgot password?
          </a>
        </div>
        
        {/* Submit Button - Enhanced with interactive effects */}
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-3/4 bg-[#0083B1] text-white py-3 rounded-md font-medium 
                     hover:bg-[#007097] hover:shadow-lg hover:scale-105
                     active:scale-95 active:shadow-inner
                     focus:outline-none focus:ring-2 focus:ring-[#0083B1] focus:ring-opacity-50 
                     transition-all duration-200 ease-in-out"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;