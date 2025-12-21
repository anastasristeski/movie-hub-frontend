export default function Step({ active, icon: Icon, label }) {
  return (
    <div
      className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg ${
        active
          ? "bg-(--primary)/20 text-(--primary)"
          : "text-(--muted-foreground)"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-semibold">{label}</span>
    </div>
  );
}
