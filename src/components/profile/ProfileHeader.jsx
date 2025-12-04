export default function ProfileHeader({ user }) {
  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`;
  return (
    <div className="bg-(--card) rounded-lg border border-border p-8 text-center">
      <div className="w-24 h-24 bg-(--accent) rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-4xl font-bold text-(--primary-foreground)">
          {initials}
        </span>
      </div>
      <h1 className="text-2xl font-bold text-(--foreground) mb-1">
        {user.firstName} {user.lastName}
      </h1>
    </div>
  );
}
