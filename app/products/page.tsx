"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";


interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products); // store products
        setLoading(false); // stop loader
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Show loader while API is loading
  if (loading) {
    return <p style={{ padding: "20px" }}>Loading products...</p>;
  }

  return (
    <main style={{ padding: "20px" }}>
      <Navbar />

      {/* Product Grid */}
      <div style={styles.grid}>
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            style={styles.card}
          >
            <img style={styles.card}
              src={product.thumbnail}
              alt={product.title}

            />

            <h3 style={styles.title}>{product.title}</h3>
            <p style={styles.pstyle}>From Rs. {product.price}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}


const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    border: "1px solid #ddd",
    padding: "10px",
    textDecoration: "none",
    color: "#000",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover" as const,
    marginBottom: "10px",
  },
  title: {
    backgroundColor: "orange",
    padding: "5px",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0",
    color: "white",
  },
  pstyle: {
    fontWeight: "bold",
    marginTop: "5px",
    backgroundColor: "yellow",
    padding: "5px",
    borderRadius: "4px",
  }

};