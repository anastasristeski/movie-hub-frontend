import MovieDetails from "@/components/MovieDetails";
import Image from "next/image";

export default async function MoviePage({ params }) {
  const { id } = await params;
  const response = await fetch(`http://localhost:8080/api/movies/${id}`, {
    cache: "no-store",
  });
  const movie = await response.json();

  if (!movie || !movie.posterUrl) {
    return <div className="p-6">Loading...</div>;
  }
  return <MovieDetails movie={movie} />;
}
