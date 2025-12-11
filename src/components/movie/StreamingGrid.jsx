import MovieCard from "./MovieCard";

export default function StreamingGrid({ movies }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.tmdbId} movie={movie} />
      ))}
    </div>
  );
}
