"use client";
import { useState } from "react";
import CityExplorer from "./steps/CityExplorer";
import { Building2, Clock, CreditCard, MapPin, Ticket } from "lucide-react";
import CinemaExplorer from "./steps/CinemaExplorer";
import ShowTimeExplorer from "./steps/ShowTimeExplorer";
import SeatExplorer from "./steps/SeatExplorer";

export default function CinemaDiscovery() {
  const [step, setStep] = useState("cities");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState("");
  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setStep("cinemas");
  };
  const handleSelectCinema = (cinema) => {
    setSelectedCinema(cinema);
    setStep("showtimes");
  };
  const handleSelectShowtime = (showtime) => {
    setSelectedShowtime(showtime);
    setStep("seats");
  };
  const handleSelectCheckout = (seats) => {
    setSelectedCinema(seats);
    setStep("checkout");
  };
  const handleBack = () => {
    if (step === "cinemas") {
      setSelectedCity("");
      setStep("cities");
    } else if (step === "showtimes") {
      setStep("cinemas");
    } else if (step === "seats") {
      setSelectedShowtime("");
      setStep("showtimes");
    } else if (step === "checkout") {
      setStep("seats");
    }
  };
  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-(--foreground) mb-2">
          Find & Book Tickets
        </h1>
        <p className="text-(--muted-foreground) mb-8">
          Discover movies playing near you
        </p>
        <div
          className="flex gap-4 text-sm mb-8
    overflow-x-auto no-scrollbar whitespace-nowrap
    lg:gap-14"
        >
          <div
            className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg ${
              step === "cities"
                ? "bg-(--primary)/20 text-(--primary)"
                : "text-(--muted-foreground)"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span className="font-semibold">Select City</span>
          </div>

          <div
            className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg ${
              step === "cinemas"
                ? "bg-(--primary)/20 text-(--primary)"
                : "text-(--muted-foreground)"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span className="font-semibold">Select Cinema</span>
          </div>

          <div
            className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg ${
              step === "showtimes"
                ? "bg-(--primary)/20 text-(--primary)"
                : "text-(--muted-foreground)"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span className="font-semibold">Select Showtime</span>
          </div>

          <div
            className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg ${
              step === "seats"
                ? "bg-(--primary)/20 text-(--primary)"
                : "text-(--muted-foreground)"
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span className="font-semibold">Pick Seats</span>
          </div>
          <div
            className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg ${
              step === "checkout"
                ? "bg-(--primary)/20 text-(--primary)"
                : "text-(--muted-foreground)"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span className="font-semibold">Checkout</span>
          </div>
        </div>
      </div>
      {step === "cities" && <CityExplorer onSelectCity={handleSelectCity} />}
      {step === "cinemas" && (
        <CinemaExplorer
          city={selectedCity}
          onSelectCinema={handleSelectCinema}
          onBack={handleBack}
        />
      )}
      {step === "showtimes" && (
        <ShowTimeExplorer
          cinema={selectedCinema}
          onBack={handleBack}
          onSelectShowtime={handleSelectShowtime}
        />
      )}
      {step === "seats" && (
        <SeatExplorer
          showtime={selectedShowtime}
          onBack={handleBack}
          onSelectCheckout={handleSelectCheckout}
        />
      )}
      {step === "checkout" && <div>sss</div>}
    </div>
  );
}
