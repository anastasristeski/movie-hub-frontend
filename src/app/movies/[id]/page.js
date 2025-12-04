import MovieDetails from "@/components/movie/MovieDetails";

export default async function MoviePage({ params }) {
  const { id } = await params; // no await

  const response = await fetch(`http://localhost:8080/api/movies/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    // optional: handle 404/500
    return <div className="p-6">Failed to load movie.</div>;
  }

  const data = await response.json();

  if (!data || !data.movieResponse) {
    return <div className="p-6">Loading...</div>;
  }

  console.log("full response:", data);
  console.log("movie object:", data.movie);

  return (
    <MovieDetails movie={data.movieResponse} trailerKey={data.trailerKey} />
  );
}
