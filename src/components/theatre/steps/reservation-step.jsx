import { CheckCircle, Home } from "lucide-react";

export default function ReservationStep({ onDone }) {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="max-w-md w-full bg-(--card) border border-(--border) rounded-2xl p-8 text-center shadow-lg">
        <CheckCircle className="w-16 h-16 text-(--primary) mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-(--foreground) mb-2">
          Reservation Confirmed
        </h2>

        <p className="text-(--muted-foreground) mb-6">
          Your seats have been successfully reserved.
        </p>

        <button
          onClick={onDone}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
            bg-(--primary) text-(--primary-foreground)
            hover:bg-(--primary)/90 transition font-semibold"
        >
          Done
        </button>
      </div>
    </div>
  );
}
