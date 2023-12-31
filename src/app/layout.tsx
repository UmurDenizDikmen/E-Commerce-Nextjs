import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionProvider from "./provider/SessionProvider";
import TansstackProvider from "./provider/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GlowMazon",
  description: "We make your husband cry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <TansstackProvider>
            <Navbar />
            <main className="p-4 max-w-7xl m-auto min-w-[300px]">
              {children}
            </main>
            <Footer />
          </TansstackProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
