"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const linkClass = (path) =>
    `hover:text-[var(--primary)] transition font-semibold ${
      pathname === path ? "text-[var(--primary)]" : "text-white"
    }`;
  return (
    <nav className=" flex  justify-between  items-center px-32 py-4 bg-(--background)">
      <Link
        href="/"
        className="text-(--foreground) text-2xl bg-(--primary) font-bold px-5 rounded"
      >
        MovieHubLogo
      </Link>
      <div className="flex gap-8 text-lg  text-(--foreground)">
        <Link href="/streaming" className={linkClass("/streaming")}>
          Streaming
        </Link>
        <Link href="/theatres" className={linkClass("/theaters")}>
          In Theatres
        </Link>
      </div>
      <div>
        <Link
          href="/signin"
          className="bg-(--primary) font-bold px-5 py-2 rounded"
        >
          Sign in
        </Link>
      </div>
    </nav>
  );
}
