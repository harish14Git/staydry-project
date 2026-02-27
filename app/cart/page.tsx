"use client";
import { useRouter } from "next/navigation";
import styles from "@/src/styles/cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/src/store/store";
import { increaseQty, decreaseQty, removeItem, clearCart } from "@/src/store/cartSlice";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  // reading cart items from Redux store
  const cart = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className={styles.cartPage}>
      <div className={styles.cartContent}>
        <h1 className={styles.cartTitle}>My Cart</h1>

        {cart.length === 0 ? (
          <div className={styles.emptyCartWrapper}>
            <img
              src="/Assets/empty-cart.png"
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
                      <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
                    </div>

                    <button
                      className={styles.removeBtn}
                      onClick={() => dispatch(removeItem(item.id))}
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
              <button
                className={styles.clearBtn}
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}