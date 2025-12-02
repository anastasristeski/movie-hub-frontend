import "./globals.css";
export const metadata = {
  title: "Moviehub",
  description: "Movies platform",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
