"use client";
import Link from "next/link";
import { useState } from "react";
import api from "@/lib/api/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext.jsx";
import { setAccessToken } from "@/lib/api/auth";
export default function SignInPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await api.post("/auth/authenticate", {
        email,
        password,
      });

      const accessToken = response.data.token;
      setAccessToken(response.data.token);
      const meResponse = await api.get("/profile/me", {
        withCredentials: true,
      });
      console.log("/ME/RESPONSE", meResponse.data);
      setUser(meResponse.data);
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
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
            Welcome Back
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            />
          </div>

          <button
            type="submit"
            className="w-full bg-(--primary) text-(--primary-foreground) py-2 rounded font-semibold hover:opacity-90"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-(--muted-foreground)">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-(--accent) hover:text-(--primary) transition font-medium"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
