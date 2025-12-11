"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Play } from "lucide-react";

export default function MovieCardGrid({ movie }) {
  const ratingValue = movie.rating ?? movie.voteAverage;
  const rating =
    ratingValue && ratingValue > 0 ? ratingValue.toFixed(1) : "N/A";

  return (
    <Link href={`/streaming/${movie.tmdbId}`}>
      <div className="group cursor-pointer">
        <div className="relative w-full aspect-2/3 overflow-hidden rounded-lg bg-card mb-3">
          <Image
            fill
            src={movie.posterUrl}
            alt={movie.title}
            className="object-cover transition duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition" />

          <button
            className="
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              opacity-0 group-hover:opacity-100 transition
              p-3 bg-red-600 hover:bg-red-700 rounded-full
            "
          >
            <Play className="w-6 h-6 text-primary-foreground fill-current" />
          </button>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-semibold transition group-hover:text-red-500 line-clamp-1">
            {movie.title}
          </h3>

          <div className="flex items-center gap-1 text-sm transition group-hover:text-red-500">
            <Star className="w-4 h-4 fill-red-500 text-red-500" />
            <span className="font-semibold">{rating}</span>
            <span className="text-muted-foreground group-hover:text-red-500">
              /10
            </span>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 transition group-hover:text-red-400">
            {movie.overview}
          </p>
        </div>
      </div>
    </Link>
  );
}
