"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import styles from "@/src/styles/OrderConfirmation.module.css";
import { useDispatch } from "react-redux";
import { clearCart } from "@/src/store/cartSlice";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff4d00", "#ffcc00", "#28a745", "#007bff"],
    });
  }, []);

  return (
    <main className={styles.page}>

      <motion.div
        className={styles.iconWrapper}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.span
          className={styles.checkmark}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          ✓
        </motion.span>
      </motion.div>

      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Order Placed Successfully!
      </motion.h1>

      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Thank you for your purchase 🎉 Your order is being processed.
      </motion.p>

      <motion.button
        className={styles.btn}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/products")}
      >
        Continue Shopping
      </motion.button>

    </main>
  );
}