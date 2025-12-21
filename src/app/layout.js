import Navbar from "@/components/navbar";
import "./globals.css";
import Footer from "@/components/footer";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import GlobalLoader from "@/components/global-loader";
export const metadata = {
  title: "Moviehub",
  description: "Movies platform",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AuthProvider>
          <LoadingProvider>
            <Navbar />
            <GlobalLoader />
            {children}
            <Footer />
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
