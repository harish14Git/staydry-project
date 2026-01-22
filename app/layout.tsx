import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar"; // <-- FIXED
import { CartProvider } from "@/src/context/CartContext";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Inter } from "next/font/google"; 
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Navbar /> {/* Now works */}
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}