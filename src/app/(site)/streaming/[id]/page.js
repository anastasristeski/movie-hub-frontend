"use client";
import { useLoading } from "@/app/context/LoadingContext";
import MovieDetails from "@/components/movie/MovieDetails";
import api from "@/lib/api/axios";
import { use, useEffect, useState } from "react";

export default function MoviePage({ params }) {
  const { id } = use(params);
  const { setIsLoading } = useLoading();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadMovie = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/movies/${id}`);
        setMovie(response.data.movieResponse);
        setTrailerKey(response.data.trailerKey);
      } catch (error) {
        setError("Failed to load movie.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMovie();
  }, [id, setIsLoading]);
  if (error) return <div className="p-6 text-(--accent)">{error}</div>;

  if (!movie)
    return <div className="p-6 text-(--accent)">Loading movie ....</div>;

  return <MovieDetails movie={movie} trailerKey={trailerKey} />;
}
