import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import TrendingRow from "@/components/TrendingRow";

async function fetchTrending(type) {
  const response = await fetch(`http://localhost:8080/api/trending/${type}`, {
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
      <Navbar />
      <Hero />
      <TrendingRow title="Trending Today" movies={day} />
      <TrendingRow title="Trending this week" movies={week} />
      <Footer />
    </main>
  );
}
