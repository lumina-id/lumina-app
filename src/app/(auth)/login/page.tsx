"use client";
import { AuthButton, AuthCard, AuthInput } from "@/components/auth";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement actual login logic
    console.log("Login attempt:", { email, password });
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <AuthCard
      title="Welcome Back to Lumina"
      subtitle="Sign in to access your communication space"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
        <AuthInput
          id="email"
          label="Email"
          type="email"
          placeholder="Input your email"  
          value={email}
          onChange={setEmail}
        />
        <AuthInput
          id="password"
          label="Password"
          type="password"
          placeholder="Input your password"
          value={password}
          onChange={setPassword}
        />
        <div className="mt-[8px]">
          <AuthButton type="submit" loading={loading}>
            Sign in
          </AuthButton>
        </div>
        <p className="text-center text-[14px] text-[#6b7280] tracking-[-0.3px]">
          Don&apos;t have account?{" "}
          <Link
            href="/signup"
            className="text-[#0B1FB7] font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
