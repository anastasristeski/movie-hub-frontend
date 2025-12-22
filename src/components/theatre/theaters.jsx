"use client";
import { useReducer } from "react";
import CityStep from "./steps/city-step";
import {
  Armchair,
  Building2,
  Clock,
  CreditCard,
  MapPin,
  Ticket,
} from "lucide-react";
import CinemaExplorer from "./steps/cinema-step";
import ShowtimeStep from "./steps/showtime-step";
import SeatStep from "./steps/seat-step";
import CheckoutStep from "./steps/checkout-step";
import Step from "./steps/step";
import ReservationStep from "./steps/reservation-step";

export default function Theater() {
  const initialState = {
    step: "cities",
    city: null,
    cinema: null,
    showtime: null,
    seats: [],
    reservation: null,
    reservationStatus: null,
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
          reservationStatus: "success",
          step: "result",
        };

      case "RESERVATION_FAILED":
        return {
          ...state,
          reservation: action.payload,
          reservationStatus: "failed",
          step: "result",
        };
      case "RESET":
        return initialState;

      case "BACK":
        switch (state.step) {
          case "result":
            return {
              ...state,
              step: "seats",
            };
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
  const handleReservationFail = () => {
    dispatch({
      type: "RESERVATION_FAILED",
    });
  };
  const renderStep = () => {
    switch (booking.step) {
      case "cities":
        return (
          <CityStep
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
          <ShowtimeStep
            cinema={booking.cinema}
            onSelectShowtime={(showtime) =>
              dispatch({ type: "SHOWTIME_SELECTED", payload: showtime })
            }
            onBack={handleBack}
          />
        );
      case "seats":
        return (
          <SeatStep
            showtime={booking.showtime}
            onSelectCheckout={(seats) =>
              dispatch({ type: "SEATS_SELECTED", payload: seats })
            }
            onBack={handleBack}
          />
        );
      case "checkout":
        return (
          <CheckoutStep
            booking={booking}
            onBack={handleBack}
            onSuccess={handleReservationSuccess}
            onFail={handleReservationFail}
          />
        );
      case "result":
        return (
          <ReservationStep
            status={booking.reservationStatus}
            onDone={() => dispatch({ type: "RESET" })}
            onRetry={() => dispatch({ type: "BACK" })}
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
