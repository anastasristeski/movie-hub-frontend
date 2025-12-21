"use client";
import { useReducer, useState } from "react";
import CityExplorer from "./steps/CityExplorer";
import {
  Armchair,
  Building2,
  Clock,
  CreditCard,
  MapPin,
  Ticket,
} from "lucide-react";
import CinemaExplorer from "./steps/CinemaExplorer";
import ShowTimeExplorer from "./steps/ShowTimeExplorer";
import SeatExplorer from "./steps/SeatExplorer";
import CheckoutExplorer from "./steps/CheckoutExplorer";
import Step from "./steps/Step";
import ReservationSuccess from "./steps/ReservationSuccess";

export default function CinemaDiscovery() {
  const initialState = {
    step: "cities",
    city: null,
    cinema: null,
    showtime: null,
    seats: [],
    reservation: null,
  };
  function bookingReducer(state, action) {
    switch (action.type) {
      case "CITY_SELECTED":
        return {
          ...state,
          city: action.payload,
          step: "cinemas",
        };
      case "CINEMA_SELECTED":
        return {
          ...state,
          cinema: action.payload,
          step: "showtimes",
        };
      case "SHOWTIME_SELECTED":
        return {
          ...state,
          showtime: action.payload,
          step: "seats",
        };
      case "SEATS_SELECTED":
        return {
          ...state,
          seats: action.payload,
          step: "checkout",
        };
      case "RESERVATION_SUCCESS":
        return {
          ...state,
          reservation: action.payload,
          step: "success",
        };
      case "RESET":
        return initialState;
      case "BACK":
        switch (state.step) {
          case "cinemas":
            return { ...state, city: null, step: "cities" };
          case "showtimes":
            return { ...state, cinema: null, step: "cinemas" };

          case "seats":
            return { ...state, showtime: null, step: "showtimes" };
          case "checkout":
            return { ...state, step: "seats" };

          default:
            return state;
        }
      default:
        return state;
    }
  }
  const [booking, dispatch] = useReducer(bookingReducer, initialState);
  const handleBack = () => dispatch({ type: "BACK" });
  const handleReservationSuccess = (reservation) => {
    dispatch({
      type: "RESERVATION_SUCCESS",
      payload: reservation,
    });
  };
  const renderStep = () => {
    switch (booking.step) {
      case "cities":
        return (
          <CityExplorer
            onSelectCity={(city) =>
              dispatch({ type: "CITY_SELECTED", payload: city })
            }
          />
        );
      case "cinemas":
        return (
          <CinemaExplorer
            city={booking.city}
            onSelectCinema={(cinema) =>
              dispatch({ type: "CINEMA_SELECTED", payload: cinema })
            }
            onBack={handleBack}
          />
        );
      case "showtimes":
        return (
          <ShowTimeExplorer
            cinema={booking.cinema}
            onSelectShowtime={(showtime) =>
              dispatch({ type: "SHOWTIME_SELECTED", payload: showtime })
            }
            onBack={handleBack}
          />
        );
      case "seats":
        return (
          <SeatExplorer
            showtime={booking.showtime}
            onSelectCheckout={(seats) =>
              dispatch({ type: "SEATS_SELECTED", payload: seats })
            }
            onBack={handleBack}
          />
        );
      case "checkout":
        return (
          <CheckoutExplorer
            booking={booking}
            onBack={handleBack}
            onSuccess={handleReservationSuccess}
          />
        );
      case "success":
        return (
          <ReservationSuccess
            reservation={booking.reservation}
            onDone={() => dispatch({ type: "RESET" })}
          />
        );
      default:
        return null;
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

        <div className="flex gap-4 text-sm mb-8 overflow-x-auto no-scrollbar whitespace-nowrap lg:gap-14">
          <Step
            active={booking.step === "cities"}
            icon={MapPin}
            label="Select City"
          />
          <Step
            active={booking.step === "cinemas"}
            icon={Building2}
            label="Select Cinema"
          />
          <Step
            active={booking.step === "showtimes"}
            icon={Clock}
            label="Select Showtime"
          />
          <Step
            active={booking.step === "seats"}
            icon={Armchair}
            label="Select Seats"
          />
          <Step
            active={booking.step === "checkout"}
            icon={CreditCard}
            label="Checkout"
          />
        </div>
      </div>

      {renderStep()}
    </div>
  );
}
