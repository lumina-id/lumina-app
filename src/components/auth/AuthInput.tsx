"use client";
import { useState } from "react";

interface AuthInputProps {
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
}

export default function AuthInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  id,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-[8px] w-full">
      <label
        htmlFor={id}
        className="text-[14px] md:text-[16px] font-semibold text-black tracking-[-0.3px]"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            borderColor: '#e5e7eb',
          }}
          className="w-full px-[16px] py-[14px] border-[1.5px] rounded-[12px] text-[14px] md:text-[16px] text-black placeholder:text-[#9ca3af] focus:outline-none focus:border-[#081787] focus:ring-2 focus:ring-[#081787]/20 transition-all bg-white"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280] transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
