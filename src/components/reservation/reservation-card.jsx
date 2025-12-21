import { formatShowtime } from "@/lib/formatDate";
import { Calendar, MapPin, Users } from "lucide-react";

export default function ReservationCard({ reservations }) {
  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <div
          key={reservation.id}
          className="bg-(--card) border-(--border) rounded-lg p-4 hover:bg-(--primary)/50 transition"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <h4 className="text-lg font-bold text-(--foreground) mb-2">
                {reservation.movieTitle}
              </h4>
              <div className="flex items-start gap-2 text-(--muted-foreground)">
                <MapPin className="w-4 h-4" />
                {reservation.cinemaName}
              </div>
              <div className="flex items-center gap-2 text-sm text-(--muted-foreground)">
                <Calendar className="w-4 h-4" />
                {formatShowtime(reservation.startTime)}
              </div>
            </div>

            <div className="flex items-start gap-2 text-(--accent)">
              <Users className="w-4 h-4 mt-1 shrink-0" />

              <div className="flex flex-wrap gap-1 max-w-xs md:max-w-sm">
                {reservation.seats.map((seat) => (
                  <span
                    key={seat}
                    className="
          px-2 py-0.5
          text-xs font-semibold
          bg-(--primary)/10
          border border-(--primary)/30
          rounded-md
          whitespace-nowrap
        "
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <button className="inline-block px-3 py-1 bg-(--primary)/10 border border-(--destructive)/30 rounded-full text-xs font-semibold text-(--accent)">
                Cancel reservation
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
