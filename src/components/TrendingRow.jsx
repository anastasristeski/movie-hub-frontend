import TrendingCard from "./TrendingCard";

export default function TrendingRow({ title, movies }) {
  return (
    <div className="mb-8 px-4 mx-auto max-w-6xl ">
      <h2 className="text-xl mb-3 bont-bold">{title}</h2>
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {movies.map((m) => (
          <TrendingCard key={m.tmdbId + m.type} movie={m} />
        ))}
      </div>
    </div>
  );
}
