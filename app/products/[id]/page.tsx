"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import styles from "./ProductDetails.module.css";

interface Product {
  title: string;
  price: number;
  thumbnail: string;
  description: string;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p className={styles.page}>Loading product...</p>;
  if (!product) return <p className={styles.page}>Product not found</p>;

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      productId: id,
      title: product.title,
      quantity
    });
  };

  return (
    <main className={styles.page}>
      <Navbar />

      <button onClick={() => router.back()} className={styles.backBtn}>
        ← Back
      </button>

      <div className={styles.container}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
        />

        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>₹ {product.price}</p>

          <div className={styles.qtyBox}>
            <button
              className={styles.qtyBtn}
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              className={styles.qtyBtn}
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          <button
            className={styles.cartBtn}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
