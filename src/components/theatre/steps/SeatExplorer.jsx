"use client";
import api from "@/lib/api/axios";
import { Armchair, ChevronLeft, Euro } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function SeatExplorer({ showtime, onBack, onSelectCheckout }) {
  const [allSeats, setAllSeats] = useState([]);
  const [takenSeats, setTakenSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadSeats() {
      setLoading(true);
      try {
        const response = await api.get(
          `/reservation/availability/${showtime.id}`
        );
        console.log(response.data);
        setAllSeats(response.data.allSeats);
        setTakenSeats(response.data.takenSeats);
      } catch (error) {
        console.error("Failed loading seats", error);
      } finally {
        setLoading(false);
      }
    }
    loadSeats();
  }, [showtime.id]);

  const seatGrid = useMemo(() => {
    return allSeats.reduce((acc, seat) => {
      const row = seat[0];
      if (!acc[row]) acc[row] = [];
      acc[row].push(seat);
      return acc;
    }, {});
  }, [allSeats]);

  const toggleSeat = (seat) => {
    if (takenSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

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
        Back
      </button>
      <h2 className="text-xl font-bold text-(--muted-foreground) mb-4">
        Please select your seats
      </h2>

      <div className="text-center text-(--muted-foreground) mb-4 font-semibold">
        SCREEN
      </div>
      <div className="flex justify-center gap-6 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <Armchair className="w-5 h-5 text-(--accent) " />

          <span className="text-(--muted-foreground)">Available</span>
        </div>

        <div className="flex items-center gap-2">
          <Armchair className="w-5 h-5 text-(--background) " />
          <span className="text-(--muted-foreground)">Booked</span>
        </div>
      </div>

      <div className="space-y-3 mb-8 flex justify-center items-center flex-col">
        {Object.entries(seatGrid).map(([row, seats]) => (
          <div key={row} className="flex items-center gap-2">
            <span className="w-6 text-sm font-semibold text-(--muted-foreground)">
              {row}
            </span>

            <div className="flex gap-2 flex-wrap ">
              {seats.map((seat) => {
                const taken = takenSeats.includes(seat);
                const selected = selectedSeats.includes(seat);

                return (
                  <button
                    key={seat}
                    disabled={taken}
                    onClick={() => toggleSeat(seat)}
                    className={`w-9 h-9 md:w-18 md:h-18 rounded-xl text-xs font-bold transition flex items-center justify-center
                      ${
                        taken
                          ? "bg-red-500/60 cursor-not-allowed"
                          : selected
                          ? "bg-(--primary) text-(--primary-foreground)"
                          : "bg-(--card) border border-(--border) hover:border-(--primary)"
                      }`}
                  >
                    <Armchair className="w-5 h-5 text-(--accent)" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-(--foreground)">
            Selected Seats:
          </span>
          <span className="text-(--accent) font-bold">
            {selectedSeats.length}{" "}
            {selectedSeats.length === 1 ? "seat" : "seats"}
          </span>
        </div>
        {selectedSeats.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedSeats.sort().map((seat) => (
              <span
                key={seat}
                className="px-2 py-1 bg-(--primary)/20 text-(--accent) rounded text-sm font-semibold"
              >
                {seat}
              </span>
            ))}
          </div>
        )}
        <button
          disabled={selectedSeats.length === 0}
          onClick={() => onSelectCheckout(selectedSeats)}
          className="w-full py-3 bg-(--primary) hover:bg-(--primary)/90 disabled:text-(--muted-foreground) text-(--primary-foreground) rounded-lg font-semibold transition"
        >
          <div className="flex items-center justify-between px-6">
            <div>Checkout </div>
            <div>
              Total (€
              {(selectedSeats.length * showtime.pricePerSeat).toFixed(2)})
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
