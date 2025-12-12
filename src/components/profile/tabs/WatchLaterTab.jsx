"use client";

import WatchLaterGrid from "@/components/movie/WatchLaterGrid";
import api from "@/lib/api/axios";
import { useEffect, useState } from "react";

export default function WatchLaterTab() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  async function loadMovies() {
    try {
      setLoading(true);
      const response = await api.get("/watch-later");
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
      await api.delete(`watch-later/${tmdbId}`);
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
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-(--accent) border-t-transparent" />
        </div>
      ) : movies.length > 0 ? (
        <WatchLaterGrid movies={movies} />
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
