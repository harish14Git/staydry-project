"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import styles from "./cart.module.css";
import Image from "next/image";
import emptycart from "@/public/Assets/empty-cart.png";

export default function CartPage() {
  const router = useRouter();

  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
  } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className={styles.cartPage}>
      <Navbar />

      <h1 className={styles.cartTitle}>My Cart</h1>

      {cart.length === 0 ? (
        <div className={styles.emptyCartWrapper}>
          <Image
            src={emptycart}
            alt="Empty Cart"
            className={styles.emptyCartImage}
          />
          <p className={styles.emptyCartText}>Your cart is empty 🛒</p>
        </div>
      ) : (
        <>
          <div className={styles.cartItems}>
            {cart.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className={styles.thumbnail}
                />

                <div className={styles.info}>
                  <h3>{item.title}</h3>
                  <p>₹ {item.price}</p>

                  <div className={styles.qtyBox}>
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h2>Total: ₹ {totalPrice}</h2>

            <button
              className={styles.checkoutBtn}
              onClick={() => router.push("/checkout")}
            >
              Proceed to Checkout
            </button>

            <button className={styles.clearBtn} onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </main>
  );
}
