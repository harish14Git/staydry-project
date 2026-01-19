import Link from "next/link";
import React from "react";
import Navbar from "@/src/components/Navbar";
import { useCart } from "@/src/context/CartContext";
import Footer from "@/src/components/Footer";
import styles from "@/src/styles/Home.module.css";

export default function HomePage() {
  return (
    <main>
    

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>
            Quality Products for Everyday Life
          </h1>

          <p className={styles.subtitle}>
            Discover reliable, affordable, and high-quality products designed
            to make your life easier.
          </p>

          <Link href="/products" className={styles.button}>
            Shop All
          </Link>

          <Link
            href="/contact"
            className={`${styles.button} ${styles.secondaryButton}`}
          >
            Contact Us
          </Link>
        </div>
      </section>
      
    </main>
  );
}
