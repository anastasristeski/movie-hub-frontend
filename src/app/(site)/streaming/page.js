"use client";

import StreamingGrid from "@/components/movie/StreamingGrid";
import api from "@/lib/api/axios";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useLoading } from "@/app/context/LoadingContext";
import { Search } from "lucide-react";

export default function StreamingPage() {
  const { setIsLoading } = useLoading();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  const debounceRef = useRef(null);

  const trimmedQuery = searchQuery.trim();
  const isSearchMode = trimmedQuery.length >= 3;

  useEffect(() => {
    if (!isSearchMode) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        setIsLoading(true);
        const res = await api.get(
          `/movies/search?query=${encodeURIComponent(
            trimmedQuery
          )}&page=0&size=30`
        );
        setMovies(res.data.content);
        setTotalPages(res.data.totalPages);
      } finally {
        setIsLoading(false);
      }
    }, 2250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [isSearchMode, trimmedQuery, setIsLoading]);

  useEffect(() => {
    const isTypingShort = trimmedQuery.length > 0 && trimmedQuery.length < 3;

    if (isSearchMode || isTypingShort) return;

    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/movies?page=${page}&size=30`);
        setMovies(res.data.content);
        setTotalPages(res.data.totalPages);
        setTotalMovies(res.data.totalElements);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [page, isSearchMode, trimmedQuery, setIsLoading]);

  const generatePageButtons = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(0);

    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages - 2, page + 2);

    if (start > 1) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 2) pages.push("...");

    pages.push(totalPages - 1);
    return pages;
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-8 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-2xl md:text-6xl font-bold text-foreground">
              Explore Our Library
            </h1>

            <div className="h-16 flex items-center">
              <span className="text-5xl md:text-6xl font-bold text-(--accent)">
                <CountUp end={totalMovies} duration={1.6} separator="," />
              </span>
            </div>
          </div>

          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-(--muted-foreground) w-5 h-5" />

            <input
              value={searchQuery}
              onChange={(e) => {
                setPage(0);
                setSearchQuery(e.target.value);
              }}
              type="text"
              placeholder="Search movies..."
              className="w-full px-4 py-3 pl-10 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white outline-none focus:ring-2 focus:ring-(--accent)"
            />
          </div>

          <p className="text-(--muted-foreground) text-lg mt-4">
            {isSearchMode
              ? `Showing results for "${searchQuery}"`
              : "Discover thousands of premium movies"}
          </p>
        </div>

        <StreamingGrid movies={movies} />

        {/* Pagination only visible when NOT searching */}
        {!isSearchMode && (
          <div className="flex justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-5 py-2 rounded bg-zinc-800 disabled:opacity-40"
            >
              Prev
            </button>

            {generatePageButtons().map((p, i) =>
              p === "..." ? (
                <span key={i} className="px-3 text-zinc-400">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-2 rounded ${
                    p === page
                      ? "bg-(--primary) text-black font-bold"
                      : "bg-zinc-800 hover:bg-zinc-700"
                  }`}
                >
                  {p + 1}
                </button>
              )
            )}

            <button
              onClick={() => setPage((p) => (p + 1 < totalPages ? p + 1 : p))}
              disabled={page + 1 >= totalPages}
              className="px-5 py-2 rounded bg-zinc-800 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
