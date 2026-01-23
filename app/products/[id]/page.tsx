"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/src/components/Navbar";
import styles from "@/src/styles/ProductDetails.module.css";
import { useCart } from "@/src/context/CartContext";
import Image from "next/image";
import back from "@/public/Assets/back-button.png";

interface Product {
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  stock: number;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

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
  if (!product) return <p>Product not found</p>;

  const maxStock = product.stock;

  const handleAddToCart = () => {
    addToCart({
      id: Number(id),
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity,
    });

    setShowPopup(true);

    // hide popup after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <main className={`${styles.page}  mx-auto px-4 md:px-8`}>
      {/* ✅ Back button with Next.js Image */}
      <button onClick={() => router.back()} className={styles.backBtn}>
        <Image
          src={back}
          alt="Move to back"
          width={30}
          height={30}
        />
      </button>

      <div className={styles.container}>
        {/* ✅ Product thumbnail (can stay as <img> or switch to <Image /> for optimization) */}
        <img src={product.thumbnail} alt={product.title} className={styles.image} />

        <div className={styles.info}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>₹ {product.price}</p>

          <div className={styles.qtyBox}>
            <button
              onClick={() => setQuantity(q => q - 1)}
              disabled={quantity === 1}
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              onClick={() => setQuantity(q => q + 1)}
              disabled={quantity === maxStock}
            >
              +
            </button>
          </div>

          {/* ✅ Add to Cart Button */}
          <button className={styles.cartBtn} onClick={handleAddToCart}>
            Add to Cart
          </button>

          {/* ✅ Popup */}
          {showPopup && (
            <div className={styles.cartPopup}>
              ✅ Added to cart
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
