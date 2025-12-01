export default function Footer() {
  return (
    <footer className="mt-20 py-10 text-center text-sm text-(--foreground)/80 border-t border-white/10">
      <div>
        <p>© {new Date().getFullYear()} MovieHub</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
}
