export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm text-(--destructive) z-9998">
      <div className="h-12 w-12 border-4 border-white/40 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
