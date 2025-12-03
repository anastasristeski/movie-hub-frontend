import Image from "next/image";
import { Play, Heart, Star, CalendarDays } from "lucide-react";
import { formatDate } from "@/lib/formatDate";

export default function MovieDetails({ movie }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="relative aspect-2/3 overflow-hidden rounded-lg shadow-2xl shadow-primary/30">
              <Image
                fill
                src={movie.posterUrl}
                alt={movie.title}
                className="rounded-xl"
              />
            </div>
            <button className="w-full mt-3 py-3 bg-(--primary) hover:bg-(--primary)/70 text-(--primary-foreground) rounded-lg font-semibold transition flex items-center justify-center gap-2">
              <Play />
              Watch Now
            </button>
            <button className="w-full mt-3 py-3 bg-card hover:bg-card/80 text-foreground border border-none rounded-lg font-semibold transition flex items-center justify-center gap-2">
              <Heart className="w-f5 h-5 " />
              Add to Wishlist
            </button>
          </div>
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
            <div className="md:col-span-2">
              <div className="flex gap-2">
                {movie.genres
                  .flatMap((genre) => genre.split(","))
                  .map((genre) => (
                    <span key={genre}>{genre.trim()}</span>
                  ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Star className="w-5 h-5 fill-(--accent) text-(--accent)" />
                <div className="flex flex-col">
                  <span className="text-sm text-(--muted-foreground)">
                    TMDB
                  </span>
                  <span>{movie.voteAverage.toFixed(1)}/10</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-(--accent)" />
                <div className="flex flex-col leading-tight">
                  <span className="text-sm text-(--muted-foreground)">
                    Release Date
                  </span>
                  <span className="text-(--foreground) font-semibold">
                    {formatDate(movie.releaseDate)}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-300">{movie.overview}</p>
            <iframe
              src={`https://www.youtube.com/embed/F8qxwts_bE4`}
              className="w-150 h-100 rounded-xl"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
