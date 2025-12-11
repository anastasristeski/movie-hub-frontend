import MovieCard from "./MovieCard";
export default function TrendingRow({ title, movies }) {
  return (
    <div className="mb-8 px-4 mx-auto max-w-6xl ">
      {title && <h2 className="text-xl mb-3 bont-bold">{title}</h2>}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {movies.map((m) => (
          <MovieCard key={m.tmdbId} movie={m} />
        ))}
      </div>
    </div>
  );
}
