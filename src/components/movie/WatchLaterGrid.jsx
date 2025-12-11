"use client";

import MovieCard from "./MovieCard";
import MovieCardGrid from "./MovieGridCard";

export default function WatchLaterGrid({ movies }) {
  return (
    <div className="max-w-7xl ">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCardGrid key={movie.tmdbId} movie={movie} />
        ))}
      </div>
    </div>
  );
}
