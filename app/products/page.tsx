"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import styles from "./products.module.css";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [showTop, setShowTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("");
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  if (loading) return <p className={styles.page}>Loading products...</p>;

  const categories = ["all", ...new Set(products.map(p => p.category))];

  const filteredProducts = products
    .filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p =>
      category === "all" || p.category === category
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  return (
    <main className={styles.page}>
      <Navbar />

      {/* CONTROLS */}
      <div className={styles.controls}>
        <input
          className={styles.search}
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className={styles.select}
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className={styles.select}
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>

        <button
          className={styles.clearBtn}
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>

      </div>

      {filteredProducts.length === 0 && (
        <div className={styles.empty}>
          <p>No products found 😕</p>
        </div>
      )}

      {/* PRODUCT GRID */}
      <div className={styles.grid}>
        {filteredProducts.map(product => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className={styles.card}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className={styles.image}
            />
            <h3 className={styles.title}>{product.title}</h3>
            <p className={styles.price}>From Rs. {product.price}</p>
          </Link>
        ))}
      </div>

      {showTop && (
        <button
          className={styles.scrollTop}
          onClick={scrollToTop}
        >
          ↑ Top
        </button>
      )}

    </main>
  );
}
