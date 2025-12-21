"use client";
import ReservationCard from "@/components/reservation/ReservationCard";
import api from "@/lib/api/axios";
import { useEffect, useState } from "react";

export default function ReservationsTab() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  async function loadReservations() {
    try {
      setLoading(true);
      const response = await api.get("/reservation/me");
      console.log("RESERVATIONS RESPONSE", response.data);
      setReservations(response.data);
    } catch (error) {
      console.error("Failed to fetch reservations", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadReservations();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-(--accent) border-t-transparent" />
      </div>
    );
  }
  return <ReservationCard reservations={reservations} />;
}
