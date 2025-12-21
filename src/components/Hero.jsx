import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 cinema-glow pointer-events-none"></div>

      <h1 className="text-6xl font-black tracking-wide uppercase mb-6">
        <span className="text-(--primary)">Unlimited Movies</span>
      </h1>

      <p className="text-xl text-(--foreground)/70 max-w-2xl mx-auto mb-10">
        Stream thousands of movies or find showtimes near you.
      </p>

      <div className="flex justify-center gap-6">
        <Link
          href="/streaming"
          className="bg-(--primary) text-white px-6 py-3 rounded-lg font-semibold hover:bg-(--accent) transition"
        >
          Browse Streaming
        </Link>

        <a
          href="/theatres"
          className="border border-(--primary) text-(--primary) px-6 py-3 rounded-lg font-semibold hover:bg-(--primary) hover:text-white transition"
        >
          Find Theatres
        </a>
      </div>
    </section>
  );
}
