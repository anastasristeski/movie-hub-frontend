import { CheckCircle, Home, XCircle } from "lucide-react";

export default function ReservationStep({ status, onDone, onRetry }) {
  const success = status === "success";
  return (
    <div className="flex justify-center items-center py-16">
      <div className="max-w-md w-full bg-(--card) border border-(--border) rounded-2xl p-8 text-center shadow-lg">
        {success ? (
          <CheckCircle className="w-16 h-16 text-green-700 mx-auto mb-4" />
        ) : (
          <XCircle className="w-16 h-16 text-(--primary) mx-auto mb-4" />
        )}

        <h2 className="text-2xl font-bold text-(--foreground) mb-2">
          {success ? "Reservation Confirmed" : "Reservation Failed"}
        </h2>

        <p className="text-(--muted-foreground) mb-6">
          {success
            ? "Your seats have been successfully reserved."
            : "Your selected seats are no longer available. Please select again"}
        </p>

        {success ? (
          <button
            onClick={onDone}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
            bg-(--primary) text-(--primary-foreground)
            hover:bg-(--primary)/90 transition font-semibold"
          >
            Done
          </button>
        ) : (
          <button
            onClick={onRetry}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
            bg-(--primary) text-(--primary-foreground)
            hover:bg-(--primary)/90 transition font-semibold"
          >
            Back to seat selection
          </button>
        )}
      </div>
    </div>
  );
}
