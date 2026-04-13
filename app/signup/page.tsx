"use client";

import { useState } from "react";
import { authSignup } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authSignup({ name, email, password });
      if (res.data.success) {
        localStorage.setItem("moksha_token", res.data.token);
        setStatus("Signup successful");
        router.push("/");
      } else {
        setStatus(res.data.message || "Signup failed");
      }
    } catch (error: any) {
      setStatus(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF8F2] p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#5A3E2B] text-white rounded"
          >
            Signup
          </button>
        </form>
        <p className="mt-4 text-sm text-red-600">{status}</p>
      </div>
    </div>
  );
}
