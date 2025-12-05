"use client";
import { useState } from "react";
import { Bookmark, Ticket, Clock, History } from "lucide-react";
import WatchLaterTab from "./WatchLaterTab";
const tabs = [
  { id: "watchlater", label: "Watch Later", icon: Bookmark },
  { id: "history", label: "History", icon: History },
  { id: "reservations", label: "Active Reservations", icon: Ticket },
  { id: "history-reservations", label: "Reservation History", icon: Clock },
];
export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("watchlater");
  return (
    <div>
      <div className="flex gap-2 mb-2 overflow-x-auto pb-2 ">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-semibold whitespace-nowrap transition ${
                activeTab === tab.id
                  ? "text-(--primary) border-b-2 border-(--primary)"
                  : "text-(--muted-foreground) hover:text-(--foreground)"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="rounded- p-6">
        {activeTab === "watchlater" && <WatchLaterTab />}
      </div>
    </div>
  );
}
