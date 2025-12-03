"use client";
import { isLoggedIn, logout } from "@/lib/api/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const linkClass = (path) =>
    `hover:text-[var(--primary)] transition font-semibold ${
      pathname === path ? "text-[var(--primary)]" : "text-white"
    }`;
  return (
    <div className=" flex  justify-between  items-center px-32 py-4 bg-(--background)">
      <div>
        <span className="text-2xl font-bold text-(--foreground) bg-(--primary) rounded-lg p-2">
          MH
        </span>
        <Link href="/" className="text-(--foreground) text-2xl font-bold px-5">
          MovieHub
        </Link>
      </div>
      <div className="flex gap-8 text-lg  text-(--foreground)">
        <Link href="/streaming" className={linkClass("/streaming")}>
          Streaming
        </Link>
        <Link href="/theatres" className={linkClass("/theaters")}>
          In Theatres
        </Link>
      </div>
      <div className="flex gap-4">
        {isLoggedIn() ? (
          <Link
            href="/signin"
            onClick={logout}
            className="bg-(--primary) font-bold px-5 py-2 rounded"
          >
            Logout
          </Link>
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
