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
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 bg-(--card) border-r border-(--border) flex flex-col min-h-screen`}
      >
        <nav className="flex-1 p-4 space-y-2 ovreflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-(--muted-foreground) hover:bg-primary/10 hover:text-(--primary) transition"
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </main>
    </div>
  );
}
