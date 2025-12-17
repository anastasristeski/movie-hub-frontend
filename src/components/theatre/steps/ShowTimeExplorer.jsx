"use client";
import api from "@/lib/api/axios";
import { ChevronLeft, Clock, Ticket } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function ShowTimeExplorer({ cinema, onBack, onSelectShowtime }) {
  const [showTimes, setShowTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const dates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return {
        date: d.toISOString().split("T")[0],
        label:
          i === 0
            ? "Today"
            : i === 1
            ? "Tommorow"
            : d.toLocaleDateString(undefined, { weekday: "long" }),
      };
    });
  }, []);
  useEffect(() => {
    if (!cinema?.id) return;
    async function loadShowtimes() {
      setLoading(true);
      try {
        const response = await api.get(
          `/showtime/cinema/${cinema.id}?date=${selectedDate}`
        );
        console.log("Showtime response", response.data);
        setShowTimes(response.data);
      } catch (error) {
        console.error("Failed fetching showtimes", error);
      } finally {
        setLoading(false);
      }
    }
    loadShowtimes();
  }, [cinema.id, selectedDate]);
  const movies = useMemo(() => {
    return showTimes.reduce((acc, st) => {
      const movie = st.movieResponse;
      if (!acc[movie.tmdbId]) {
        acc[movie.tmdbId] = { movie, showtimes: [] };
      }
      acc[movie.tmdbId].showtimes.push(st);
      return acc;
    }, {});
  }, [showTimes]);
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
        className="flex items-center gap-2 text-(--accent) hover:text-primary transition mb-6 font-semibold"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Cinemas
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-(--foreground) mb-2">
          {cinema.name}
        </h2>
        <p className="text-(--muted-foreground)">Select a movie and showtime</p>
      </div>

      <div className="mb-8">
        <p className="text-sm font-semibold text-(--muted-foreground) mb-3">
          Select Date
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {dates.map(({ date, label }) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`shrink-0 px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                selectedDate === date
                  ? "bg-(--primary) text-(--primary-foreground)"
                  : "bg-(--background) border border-(--border) hover:border-(--primary) text-(--foreground)"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-(--muted-foreground) text-center py-12">
          Loading showtimes…
        </div>
      )}

      {!loading && Object.keys(movies).length === 0 && (
        <div className="text-(--muted-foreground) text-center py-12">
          No showtimes for this date
        </div>
      )}

      <div className="space-y-6">
        {Object.values(movies).map(({ movie, showtimes }) => (
          <div
            key={movie.tmdbId}
            className="bg-(--background) border border-(--border) rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-(--foreground)">
                  {movie.title}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-3 justify-start">
              {showtimes.map((st) => {
                const time = new Date(st.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <button
                    key={st.id}
                    onClick={() => onSelectShowtime(st)}
                    className="p-4 bg-card border border-(--border) hover:border-(--primary) hover:bg-(--primary)/5 rounded-lg transition text-center group"
                  >
                    <Clock className="w-5 h-5 text-(--accent) group-hover:text-(--primary) transition mx-auto mb-2" />
                    <div className="text-lg font-bold text-(--foreground) group-hover:text-(--primary) transition">
                      {time}
                    </div>
                    <div className="text-xs text-(--muted-foreground) mt-1 mb-2">
                      €{st.pricePerSeat.toFixed(2)}
                    </div>
                    <div className="text-xs text-(--accent) font-semibold flex items-center justify-center gap-1">
                      <Ticket className="w-3 h-3" />
                      {st.availableSeats} seats
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
