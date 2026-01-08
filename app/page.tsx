import Link from "next/link";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import styles from "./Home.module.css";

export default function HomePage() {
  return (
    <main>
      <Navbar />

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
