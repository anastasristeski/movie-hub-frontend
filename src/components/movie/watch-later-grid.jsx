import WatchLaterMovieCard from "./watch-later-movie-card";

export default function WatchLaterGrid({ movies, onRemove }) {
  return (
    <div className="max-w-7xl ">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <WatchLaterMovieCard
            key={movie.tmdbId}
            movie={movie}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}
