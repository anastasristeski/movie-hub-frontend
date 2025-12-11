"use client";
import Link from "next/link";
import { useState } from "react";
import api from "@/lib/api/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext.js";
import { setAccessToken } from "@/lib/api/auth";
import { PuffLoader } from "react-spinners";
export default function SignInForm({ onSuccess }) {
  const router = useRouter();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
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
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("Email or password is incorrect");
      setPassword("");
      setEmail("");
      setIsLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 bg-(--desctuctive)/10 border border-(--destructive)/30 rounded-lg text-sm text-(--destructive) ">
            {error}
          </div>
        )}
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
        {isLoading ? (
          <div className="w-full flex justify-center py-2 text-(--destructive)">
            <PuffLoader color="currentColor" />
          </div>
        ) : (
          <button
            type="submit"
            className="w-full bg-(--primary) text-(--primary-foreground) py-2 rounded font-semibold hover:opacity-90"
            disabled={isLoading}
          >
            Sign In
          </button>
        )}
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
    </>
  );
}
