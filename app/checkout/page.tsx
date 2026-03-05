"use client";

import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/src/store/cartSlice";
import { RootState } from "@/src/store/store";
import { useRouter } from "next/navigation";
import styles from "@/src/styles/checkout.module.css";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart.items);

  // Read discount and coupon from Redux
  const discount = useSelector((state: RootState) => state.cart.discount);
  const appliedCoupon = useSelector((state: RootState) => state.cart.appliedCoupon);

  const rawTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  const finalTotal = Math.max(rawTotal - discount, 0).toFixed(2);

  const handlePlaceOrder = () => {
    router.push("/order-confirmation");
  };

  if (cart.length === 0) {
    return (
      <main className={styles.page}>
        <h2>Your cart is empty 🛒</h2>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Checkout</h1>
      <div className={styles.container}>
        <div className={styles.summary}>

          {cart.map(item => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemLeft}>
                <img src={item.thumbnail} alt={item.title} className={styles.itemImage} />
                <span className={styles.itemTitle}>{item.title} × {item.quantity}</span>
              </div>
              <span className={styles.itemPrice}>₹ {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <hr className={styles.divider} />

          <div className={styles.totalBox}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>₹ {rawTotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className={`${styles.totalRow} ${styles.discountRow}`}>
                <span>Discount {appliedCoupon && `(${appliedCoupon})`}</span>
                <span>- ₹ {discount.toFixed(2)}</span>
              </div>
            )}

            <div className={`${styles.totalRow} ${styles.finalRow}`}>
              <strong>Total</strong>
              <strong>₹ {finalTotal}</strong>
            </div>
          </div>

        
          <button className={styles.placeOrderBtn} onClick={handlePlaceOrder}>
            Place Order 🚀
          </button>

        </div>
      </div>
    </main>
  );
}