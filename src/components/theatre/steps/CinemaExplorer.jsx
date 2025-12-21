"use client";
import api from "@/lib/api/axios";
import { Building2, ChevronLeft, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function CinemaExplorer({ city, onSelectCinema, onBack }) {
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadCinemas() {
      try {
        const response = await api.get(`/cinema/city/${city.id}`);
        console.log("Cinemas response", response);
        setCinemas(response.data);
      } catch (error) {
        console.error("Failed to load cinemas", error);
      } finally {
        setLoading(false);
      }
    }
    loadCinemas();
  }, [city]);
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-(--accent) border-t-transparent" />
      </div>
    );
  }
  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-(--accent) hover:text-(--primary) transition mb-6 font-semibold"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Cities
      </button>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-(--foreground) mb-2">
          Cinemas in {city.name}
        </h2>
        <p className="text-(--muted-foreground)">
          Select a cinema to see available showtimes
        </p>
      </div>
      <div className="space-y-3">
        {cinemas.map((cinema) => (
          <button
            key={cinema.id}
            onClick={() => onSelectCinema(cinema)}
            className="w-full p-4 bg-(--background) border border-(--border) hover:border-(--primary) hover:bg-(--primary)/5 rounded-lg transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 text-left">
                <div className="p-3 bg-(--primary)/10 rounded-lg mt-0.5">
                  <Building2 className="w-5 h-5 text-(--primary)" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-(--foreground) mb-1">
                    {cinema.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-(--muted-foreground)" />
                    <span className="text-sm text-(--muted-foreground)">
                      {cinema.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-3 py-1 bg-(--accent)/10 text-(--accent) rounded font-semibold text-sm self-center">
                View
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
