"use client";
import api from "@/lib/api/axios";
import { Building2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function CityExplorer({ onSelectCity }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadCities() {
      try {
        const response = await api.get("/city");
        console.log("Cities response", response);
        setCities(response.data);
      } catch (error) {
        console.error("Failed to load citites", error);
      } finally {
        setLoading(false);
      }
    }
    loadCities();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-(--accent) border-t-transparent" />
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-2xl font-bold text-(--foreground) mb-2">
        Choose Your City
      </h2>
      <p className="text-(--muted-foreground) mb-8">
        Select a city to see available cinemas and showtimes
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((city) => (
          <button
            key={city.id}
            className="p-6 bg-(--background) border border-(--border) hover:border-(--primary) hover:bg-(--prinary)/5 rounded-lg transition text-left group"
            onClick={() => onSelectCity(city)}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-(--primary)/10 rounded-lg group-hover:bg-(--primary)/20 transition">
                <MapPin className="w-6 h-6 text-(--primary)" />
              </div>
              <h3 className="text-xl font-bold text-(--foreground) group-hover:text-(--primary) transition">
                {city.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-(--muted-foreground) group-hover:text-(--foreground) transition">
              <Building2 className="w-4 h-4" />
              <span>
                {city.cinemaCount === 1
                  ? `${city.cinemaCount} cinema available`
                  : `${city.cinemaCount} cinemas available`}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
