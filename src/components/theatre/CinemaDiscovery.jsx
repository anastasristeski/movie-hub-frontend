"use client";
import { useState } from "react";
import CityExplorer from "./steps/CityExplorer";
import { Building2, Clock, MapPin } from "lucide-react";
import CinemaExplorer from "./steps/CinemaExplorer";
import ShowTimeExplorer from "./steps/ShowTimeExplorer";

export default function CinemaDiscovery() {
  const [step, setStep] = useState("cities");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setStep("cinemas");
  };
  const handleSelectCinema = (cinema) => {
    setSelectedCinema(cinema);
    setStep("showtimes");
  };
  const handleBack = () => {
    if (step === "cinemas") {
      setSelectedCity("");
      setStep("cities");
    } else if (step === "showtimes") {
      setStep("cinemas");
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
        <div className="flex items-center gap-4 text-sm mb-8 lg:gap-14">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              step === "cities"
                ? "bg-(--primary)/20 text-(--primary)"
                : "text-(--muted-foreground)"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span className="font-semibold">Select City</span>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              step === "cinemas"
                ? "bg-(--primary)/20 text-(--primary)"
                : "text-(--muted-foreground)"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span className="font-semibold">Select Cinema</span>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              step === "showtimes"
                ? "bg-(--primary)/20 text-(--primary)"
                : "text-(--muted-foreground)"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span className="font-semibold">Select Showtime</span>
          </div>
        </div>
      </div>
      {step === "cities" && <CityExplorer onSelectCity={handleCitySelect} />}
      {step === "cinemas" && (
        <CinemaExplorer
          city={selectedCity}
          onSelectCinema={handleSelectCinema}
          onBack={handleBack}
        />
      )}
      {step === "showtimes" && (
        <ShowTimeExplorer cinema={selectedCinema} onBack={handleBack} />
      )}
    </div>
  );
}
