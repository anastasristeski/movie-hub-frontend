import Hero from "../components/hero";

import TrendingMoviesRow from "../components/movie/trending-movies-row";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

async function fetchTrending(type) {
  const response = await fetch(`${BASE_URL}/trending/${type}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Failed to fetch trening movies");
  return response.json();
}
export default async function Home() {
  const [day, week] = await Promise.all([
    fetchTrending("today"),
    fetchTrending("week"),
  ]);
  return (
    <main>
      <Hero />
      <TrendingMoviesRow title="Trending Today" movies={day} />
      <TrendingMoviesRow title="Trending this week" movies={week} />
    </main>
  );
}
