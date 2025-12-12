"use client";
import Image from "next/image";
import {
  Play,
  Star,
  CalendarDays,
  Clapperboard,
  Clock,
  Loader2,
} from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import { useEffect, useState } from "react";
import api from "@/lib/api/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function MovieDetails({ movie, trailerKey }) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showPlayer, setShowPlayer] = useState(false);
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [embedUrl] = useState(`https://vidsrc.to/embed/movie/${movie.tmdbId}`);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      setIsSaved(false);
      return;
    }
    const checkSaved = async () => {
      try {
        const response = await api.get("/watch-later");
        console.log(response);
        const exists = response.data.some(
          (m) => m.movieResponse.tmdbId === movie.tmdbId
        );
        setIsSaved(exists);
      } catch (error) {
        console.error("Failed to chack watch later:", error);
      }
    };
    checkSaved();
  }, [user, movie.tmdbId]);
  useEffect(() => {
    if (showPlayer) {
      history.pushState(null, "", location.href);

      const handlePop = () => {
        history.pushState(null, "", location.href);
      };

      window.addEventListener("popstate", handlePop);
      return () => window.removeEventListener("popstate", handlePop);
    }
  }, [showPlayer]);

  const handleAdd = async () => {
    if (!user) return router.push("/signin");
    try {
      setIsLoading(true);
      await api.post(`/watch-later/${movie.tmdbId}`);
      setIsSaved(true);
    } catch (error) {
      console.error("Add failed", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRemove = async () => {
    if (!user) return router.push("/login");
    try {
      setIsLoading(true);
      await api.delete(`/watch-later/${movie.tmdbId}`);
      setIsSaved(false);
    } catch (error) {
      console.error("Remove failed", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
          <div className="md:col-span-1">
            <div className="relative w-full aspect-2/3 overflow-hidden rounded-lg shadow-2xl shadow-primary/30">
              <Image
                sizes="(max-width: 768px) 100vw, 300px"
                fill
                src={movie.posterUrl}
                alt={movie.title}
                className="rounded-xl"
              />
            </div>
            <button
              onClick={() => {
                if (!user) return router.push("/signin");
                setShowPlayer(true);
              }}
              className="w-full mt-3 py-3 bg-(--primary) hover:bg-(--primary)/70 text-(--primary-foreground) rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <Play />
              Watch Now
            </button>
            <button
              onClick={isSaved ? handleRemove : handleAdd}
              disabled={isLoading}
              className="w-full mt-3 py-3 bg-card hover:bg-card/80 text-foreground border border-none rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              {" "}
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isSaved ? (
                <>
                  <Clock className="w-5 h-5" />
                  Remove from Library
                </>
              ) : (
                <>
                  <Clock className="w-5 h-5" />
                  Watch Later
                </>
              )}
            </button>
          </div>
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-5xl font-bold mb-6">{movie.title}</h1>
            <div className="md:col-span-2 flex flex-col md:flex-row gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-5 h-5 fill-(--accent) text-(--accent)" />
                  <div className="flex flex-col">
                    <span className="text-sm text-(--muted-foreground)">
                      TMDB
                    </span>
                    <span className="font-semibold">
                      {movie.voteAverage.toFixed(1)}/10
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="w-5 h-5 text-(--accent)" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm text-(--muted-foreground)">
                      Release Date
                    </span>
                    <span className="text-(--foreground) font-semibold">
                      {formatDate(movie.releaseDate)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-(--accent)" />
                  <div className="flex flex-col leading-tight text-sm">
                    <span className=" text-(--muted-foreground)">Duration</span>
                    <span className=" text-(--foreground) font-semibold">
                      {movie.runtime}min
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 text-sm items-center">
                  <Clapperboard className="w-5 h-5 text-(--accent)" />
                  <div className="flex flex-col">
                    <span className="text-(--muted-foreground)">Genre</span>
                    <div className="grid gap-1 grid-flow-col auto-cols-max font-semibold">
                      {movie.genres
                        .flatMap((genre) => genre.split(","))
                        .map((genre) => (
                          <span key={genre}>{genre.trim()}</span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold ">Overview</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {movie.overview}
                </p>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Movie Trailer</h1>
            <div className="w-full max-w-xl aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            {showPlayer && (
              <div
                className="
      fixed inset-0 z-50 
      bg-black/70 backdrop-blur-md
      flex items-center justify-center
      p-4
      animate-fadeIn
    "
              >
                {/* Close button */}
                <button
                  onClick={() => {
                    setShowPlayer(false);
                    setPlayerLoaded(false);
                  }}
                  className="
        absolute top-6 right-6 
        text-white text-3xl 
        hover:text-red-500 transition
      "
                >
                  ✕
                </button>
                <div className="w-full max-w-5xl">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
                    {!playerLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-10 h-10 animate-spin text-white" />
                      </div>
                    )}

                    <iframe
                      src={embedUrl}
                      onLoad={() => setPlayerLoaded(true)}
                      className={`w-full h-full transition-opacity duration-300 ${
                        playerLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      allow="autoplay; encrypted-media; fullscreen"
                      allowFullScreen
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
