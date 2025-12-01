"use client";

import { useRouter } from "next/navigation";

export default function MovieGrid() {
  const router = useRouter();

  const handleMovieClick = () => {
    router.push("/signin");
  };

  return (
    <section className="px-8 py-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-(--primary) mb-6">Trending Now</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            onClick={handleMovieClick}
            className="h-40 cursor-pointer bg-black rounded-lg card-hover"
          />
        ))}
      </div>
    </section>
  );
}
