"use client";

import TrendingRow from "@/components/movie/TrendingRow";
import api from "@/lib/api/axios";
import { useEffect, useState } from "react";

export default function WatchLaterTab() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  async function loadMovies() {
    try {
      setLoading(true);
      const response = await api.get("/watchlater");
      const mappedMovies = response.data.map((item) => item.movieResponse);
      setMovies(mappedMovies);
    } catch (error) {
      console.error("Failed to load watch later movies", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }
  async function removeMovie(tmdbId) {
    setDeleteLoading(tmdbId);
    try {
      await api.delete(`watchlater/${tmdbId}`);
      await loadMovies();
    } finally {
      setDeleteLoading(null);
    }
  }
  useEffect(() => {
    loadMovies();
  }, []);
  useEffect(() => {
    console.log("from effect", movies);
  }, [movies]);
  return (
    <div>
      {movies.length > 0 ? (
        <TrendingRow movies={movies} />
      ) : (
        <div className="text-center py-12">
          <p className="text-(--muted-foreground)">
            No movies in your watch later list
          </p>
        </div>
      )}
    </div>
  );
}
