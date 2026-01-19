"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/src/context/CartContext";
import styles from "@/src/styles/order-success.module.css";

export default function OrderSuccessPage() {
  const router = useRouter();
  const { clearCart } = useCart();

  // Prevent multiple executions
  const clearedRef = useRef(false);

  useEffect(() => {
    if (!clearedRef.current) {
      clearCart();
      clearedRef.current = true;
    }
  }, [clearCart]);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.icon}>🎉</div>

          <h1 className={styles.title}>Order Placed Successfully</h1>

          <p className={styles.subtitle}>
            Your order has been confirmed.  
            Thank you for shopping with us!
          </p>

          <div className={styles.actions}>
            <button
              className={styles.primaryBtn}
              onClick={() => router.push("/")}
            >
              Continue Shopping
            </button>

            <button
              className={styles.secondaryBtn}
              onClick={() => router.push("/cart")}
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
