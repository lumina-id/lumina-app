"use client";
import { AuthButton, AuthCard, AuthInput } from "@/components/auth";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement actual signup logic
    console.log("Signup attempt:", {
      fullName,
      email,
      password,
      confirmPassword,
    });
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <AuthCard
      title="Get Started with Lumina"
      subtitle="Set up your account to start communicating with less effort"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
        <AuthInput
          id="fullName"
          label="Full Name"
          type="text"
          placeholder="User Name"
          value={fullName}
          onChange={setFullName}
        />
        <AuthInput
          id="email"
          label="Email"
          type="email"
          placeholder="user@email.com"
          value={email}
          onChange={setEmail}
        />
        <AuthInput
          id="password"
          label="Password"
          type="password"
          placeholder="P45sw0rd"
          value={password}
          onChange={setPassword}
        />
        <AuthInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="P45sw0rd"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <div className="mt-[8px]">
          <AuthButton type="submit" loading={loading}>
            Sign up
          </AuthButton>
        </div>
        <p className="text-center text-[14px] text-[#6b7280] tracking-[-0.3px]">
          Have account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
