import Navbar from "@/components/Navbar";
import "../globals.css";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
