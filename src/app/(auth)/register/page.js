"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api/axios";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const reponse = await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      router.push("/signin");
    } catch (error) {
      console.log(error);
      setError(error.reponse?.data || "Failed to create account");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-(--card) p-8 rounded-xl shadow-xl border border-(--border)">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-(--primary) rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-(--primary-foreground)">
              MH
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-2 text-(--foreground)">
            Create Account
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold text-sm text-(--foreground)">
              First Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-(--input) border border-(--border) focus:outline-none focus:ring-2 focus:ring-(--primary)"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-sm text-(--foreground)">
              Last Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-(--input) border border-(--border) focus:outline-none focus:ring-2 focus:ring-(--primary)"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-sm text-(--foreground)">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-(--input) border border-(--border) focus:outline-none focus:ring-2 focus:ring-(--primary)"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-sm text-(--foreground)">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-(--input) border border-(--border) focus:outline-none focus:ring-2 focus:ring-(--primary)"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-(--primary) text-(--primary-foreground) py-2 rounded font-semibold hover:opacity-90"
          >
            Create Account
          </button>
        </form>

        {/* Link */}
        <div className="mt-6 text-center text-sm">
          <p className="text-(--muted-foreground)">
            Already have an account?
            <Link
              href="/signin"
              className="text-(--accent) hover:text-(--primary) transition font-medium ml-1"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
