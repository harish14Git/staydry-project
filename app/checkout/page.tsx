"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    clearCart();
    router.push("/order-success");
  };

  if (cart.length === 0) {
    return (
      <main className={styles.page}>
        <Navbar />
        <h2>Your cart is empty 🛒</h2>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <Navbar />

      <h1 className={styles.title}>Checkout</h1>

      <div className={styles.container}>
        {/* ORDER SUMMARY */}
        <div className={styles.summary}>
          {cart.map(item => (
            <div key={item.id} className={styles.item}>
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>₹ {item.price * item.quantity}</span>
            </div>
          ))}

          <hr />

          <div className={styles.total}>
            <strong>Total:</strong>
            <strong>₹ {totalPrice}</strong>
          </div>

          <button
            className={styles.placeOrderBtn}
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
}
