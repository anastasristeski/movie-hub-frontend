"use client";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, User } from "lucide-react";
export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const linkClass = (path) =>
    `hover:text-[var(--primary)] transition font-semibold ${
      pathname === path ? "text-[var(--primary)]" : "text-white"
    }`;
  return (
    <div className=" flex justify-between  items-center pl-20 pr-10 py-4 bg-(--background)/80 border-b border-(--border)">
      <div>
        <Link
          href="/"
          className="text-2xl font-bold text-(--foreground) bg-(--primary) rounded p-2"
        >
          MovieHub
        </Link>
      </div>

      <div className="flex gap-4">
        {loading ? (
          <div className="w-20" />
        ) : user ? (
          <>
            <Link
              href="/profile"
              className="bg-(--primary) font-bold px-5 py-2 rounded"
            >
              <User className="w-6 h-6 text-(--foreground)" />
            </Link>
            <Link
              href="/signin"
              className="bg-(--background) px-5 py-2 rounded"
              onClick={logout}
            >
              <LogOut className="w-6 h-6 text-(--accent)" />
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/signin"
              className="bg-(--primary) font-bold px-5 py-2 rounded"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="bg-(--primary) font-bold px-5 py-2 rounded"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
