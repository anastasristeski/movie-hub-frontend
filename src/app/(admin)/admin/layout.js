"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  MapPin,
  Building2,
  Tv,
  Clock,
  Calendar,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading admin panel...
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") return null;

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/admin" },
    { icon: MapPin, label: "Cities", href: "/admin/cities" },
    { icon: Building2, label: "Cinemas", href: "/admin/cinemas" },
    { icon: Tv, label: "Halls", href: "/admin/halls" },
    { icon: Building2, label: "Movies", href: "/admin/movies" },
    { icon: Clock, label: "Showtimes", href: "/admin/showtimes" },
    { icon: Calendar, label: "Reservations", href: "/admin/reservations" },
  ];

  return (
    <div className="flex h-screen bg-(--background) overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-(--black)/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <aside
        className={`fixed md:relative top-16 md:top-0 left-0 z-40 h-[calc(100vh-4rem)] md:h-full bg-(--card) border-r border-(--border) transition-transform duration-300 w-64
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <nav className="flex-1 p-4 space-y-2 ovreflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-(--muted-foreground) hover:bg-primary/10 hover:text-(--primary) transition"
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <button className="md:hidden mb-4" onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </main>
    </div>
  );
}
