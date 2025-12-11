"use client";
import StreamingGrid from "@/components/movie/StreamingGrid";
import api from "@/lib/api/axios";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useLoading } from "@/app/context/LoadingContext";
export default function StreamingPage() {
  const { setIsLoading } = useLoading();
  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/movies?page=${page}&size=30`);
        setMovies(response.data.content);

        setTotalPages(response.data.totalPages);
        setTotalMovies(response.data.totalElements);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [page, setIsLoading]);
  const generatePageButtons = () => {
    const pages = [];
    const maxButtons = 5;
    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(0);
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages - 2, page + 2);
    if (start > 1) pages.push("ellipsis-left");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 2) pages.push("ellipsis-right");
    pages.push(totalPages - 1);
    return pages;
  };

  return (
    <main className="min-h-screen ">
      <div className="max-w-[1600px] mx-auto px-8 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-2xl md:text-6xl font-bold text-foreground">
              Explore Our Library
            </h1>
            <div className="h-16 flex flex-row items-center">
              <span className="text-5xl md:text-6xl font-bold text-(--accent)">
                <CountUp end={totalMovies} duration={1.6} separator="," />
              </span>
            </div>
          </div>
          <p className="text-(--muted-foreground) text-lg">
            Discover from thousands of premium movies
          </p>
        </div>
        <StreamingGrid movies={movies} />
        <div className=" flex justify-center items-center gap-2 mt-10 px-4 sm:px-0">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="px-5 py-2 rounded bg-zinc-800 "
            disabled={page === 0}
          >
            Prev
          </button>
          {generatePageButtons().map((num, index) => {
            if (num === "ellipsis-left" || num === "ellipsis-right") {
              return (
                <span key={index} className="px-3 py-2 text-zinc-400">
                  …
                </span>
              );
            }

            return (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`px-3 py-2 rounded transition
          ${
            page === num
              ? "bg-(--primary) text-black font-bold"
              : "bg-zinc-800 hover:bg-zinc-700"
          }`}
              >
                {num + 1}
              </button>
            );
          })}
          <button
            onClick={() => setPage((p) => (p + 1 < totalPages ? p + 1 : p))}
            className="px-5 py-2 rounded bg-zinc-800 "
            disabled={page + 1 >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
