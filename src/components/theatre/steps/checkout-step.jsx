import api from "@/lib/api/axios";
import { formatShowtime } from "@/lib/formatDate";
import { Check, ChevronLeft } from "lucide-react";
import { useState } from "react";

export default function CheckoutStep({ booking, onBack, onSuccess, onFail }) {
  const { city, cinema, showtime, seats } = booking;
  const total = seats.length * booking.showtime.pricePerSeat;
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const response = await api.post(`/reservation/${showtime.id}`, {
        seats: booking.seats,
      });
      onSuccess(response.data);
    } catch (error) {
      if (error.response?.status === 409) {
        onFail();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-(--accent) hover:text-primary transition mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        Back
      </button>

      <h2 className="text-2xl font-bold text-(--foreground) mb-6">
        Booking Summary
      </h2>

      <div className="space-y-6">
        <div className="bg-(--background) border border-(--border) rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-(--border)">
            <span className="text-(--muted-foreground)">City</span>
            <span className="text-(--foreground) font-semibold">
              {city.name}
            </span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-(--border)">
            <span className="text-(--muted-foreground)">Cinema</span>
            <span className="text-(--foreground) font-semibold">
              {cinema.name}
            </span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-(--border)">
            <span className="text-(--muted-foreground)">Hall</span>
            <span className="text-(-foreground) font-semibold">
              {showtime.hallId}
            </span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-(--border)">
            <span className="text-(--muted-foreground)">Showtime</span>
            <span className="text-(--foreground) font-semibold">
              {showtime.movieResponse.title}
            </span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-(--border)">
            <span className="text-(--muted-foreground)">When</span>
            <span className="text-(--foreground) font-semibold">
              {formatShowtime(showtime.startTime)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-(--muted-foreground)">Seats</span>
            <span className="text-(--accent) font-semibold">
              <div className="flex flex-wrap gap-2 mb-3">
                {seats.sort().map((seat) => (
                  <span
                    key={seat}
                    className="px-2 py-1 bg-(--primary)/20 text-(--accent) rounded text-sm font-semibold"
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </span>
          </div>
        </div>

        <div className="bg-(--primary)/10 border border-(--primary)/30 rounded-lg p-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-(--muted-foreground)">Ticket Price x 1</span>
            <span className="text-(--foreground)">
              €{showtime.pricePerSeat}
            </span>
          </div>

          <div className="flex justify-between items-center text-lg font-bold">
            <span className="text-(--foreground)">Total Amount</span>
            <span className="text-(--accent)">€{total}</span>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2
    ${
      loading
        ? "bg-(--primary)/60 cursor-not-allowed"
        : "bg-(--primary) hover:bg-(--primary)/90"
    }
    text-(--primary-foreground)
  `}
        >
          {loading ? (
            <>
              <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              Processing...
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              Confirm & Pay
            </>
          )}
        </button>
      </div>
    </div>
  );
}
