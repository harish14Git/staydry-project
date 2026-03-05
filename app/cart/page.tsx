"use client";
import { useState } from "react";
import type { FC } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/src/store/store";
import {
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
  applyCoupon,
  removeCoupon,
} from "@/src/store/cartSlice";
import styles from "@/src/styles/cart.module.css";

const COUPONS: Record<string, number> = {
  SAVE10: 10,
  FLAT50: 50,
  NEW20: 20,
};

const CartPage: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart.items);
  const appliedCoupon = useSelector(
    (state: RootState) => state.cart.appliedCoupon
  );
  const discount = useSelector((state: RootState) => state.cart.discount);

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const rawTotal = cart.reduce(
    (sum: number, item) => sum + item.price * item.quantity,
    0
  );

  const finalTotal = Math.max(rawTotal - discount, 0).toFixed(2);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();

    if (code in COUPONS) {
      const discountValue =
        COUPONS[code] <= 100
          ? (rawTotal * COUPONS[code]) / 100
          : COUPONS[code];

      dispatch(applyCoupon({ code, discount: discountValue }));
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponInput("");
    setCouponError("");
  };

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
            <p className={styles.emptyCartText}>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cart.map((item) => (
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
                      <button onClick={() => dispatch(decreaseQty(item.id))}>
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => dispatch(increaseQty(item.id))}>
                        +
                      </button>
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
              {/* Available Coupons */}
              <div className={styles.availableCoupons}>
                <p className={styles.couponTitle}>Available Offers</p>

                <ul className={styles.couponList}>
                  <li onClick={() => setCouponInput("SAVE10")}>
                    <strong>SAVE10</strong> – 10% off
                  </li>

                  <li onClick={() => setCouponInput("NEW20")}>
                    <strong>NEW20</strong> – 20% off
                  </li>

                  <li onClick={() => setCouponInput("FLAT50")}>
                    <strong>FLAT50</strong> – 50% off
                  </li>
                </ul>
              </div>

              {/* Coupon Input Section */}
              <div className={styles.couponBox}>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className={styles.couponInput}
                  disabled={Boolean(appliedCoupon)}
                />

                {!appliedCoupon ? (
                  <button
                    className={styles.couponBtn}
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </button>
                ) : (
                  <button
                    className={styles.removeCouponBtn}
                    onClick={handleRemoveCoupon}
                  >
                    Remove
                  </button>
                )}
              </div>

              {couponError && (
                <p className={styles.couponError}>{couponError}</p>
              )}

              {appliedCoupon && (
                <p className={styles.couponSuccess}>{appliedCoupon} applied!</p>
              )}

              {/* Totals */}
              <div className={styles.totalBox}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span>₹ {rawTotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div
                    className={`${styles.totalRow} ${styles.discountRow}`}
                  >
                    <span>Discount</span>
                    <span>- ₹ {discount.toFixed(2)}</span>
                  </div>
                )}

                <div className={`${styles.totalRow} ${styles.finalRow}`}>
                  <strong>Total</strong>
                  <strong>₹ {finalTotal}</strong>
                </div>
              </div>

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
};

export default CartPage;
