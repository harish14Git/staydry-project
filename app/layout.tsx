import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { CartProvider } from "@/src/context/CartContext";
import Providers from "./provider";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Staydry App",
  description: "Staydry e-commerce experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      > 
      <Providers>
        <CartProvider>
  
            <Navbar />
            <main className="py-1 md:py-1 ">{children}</main>
          <Footer />
         
        </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
