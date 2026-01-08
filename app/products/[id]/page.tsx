"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

interface Product {
  title: string;
  price: number;
  thumbnail: string;
  description: string;
}

export default function ProductDetailsPage() {
  const { id } = useParams(); // product id from URL
  const router = useRouter(); // for back navigation

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading product...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  // Add to cart (lightweight)
  const handleAddToCart = () => {
    console.log("Added to cart:", {
      productId: id,
      title: product.title,
      quantity: quantity,
    });
  };

  return (
    <main>
      <Navbar />

      {/* Back Button */}
      <button onClick={() => router.back()} style={styles.backBtn}>
        ← Back
      </button>

      <div style={styles.container}>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={styles.image}
        />

        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h2>₹ {product.price}</h2>

          {/* Quantity Controls */}
          <div style={styles.qtyBox}>
            <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
              -
            </button>

            <span>{quantity}</span>

            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          {/* Add to Cart */}
          <button onClick={handleAddToCart} style={styles.cartBtn}>
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  container: {
    display: "flex",
    gap: "40px",
    padding: "40px",
  },
  image: {
    width: "300px",
    height: "300px",
    objectFit: "cover" as const,
    borderRadius: "6px",
  },
  qtyBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "20px",
  },
  backBtn: {
    marginLeft: "40px",
    marginTop: "20px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  card: {
  backgroundColor: "#fff", // ADD THIS
  border: "1px solid #ddd",
  padding: "10px",
  textDecoration: "none",
  color: "#000",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
},

  cartBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "orange",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
