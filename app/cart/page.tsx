"use client";

import Navbar from "../components/Navbar";
import styles from "./cart.module.css";
import Link from "next/link";


export default function CartPage() {
    return (
        <main className={styles.page}>
            <Navbar />

            <div className={styles.empty}>
                <p>Your cart is empty 🛒</p>
            </div>

            <div className="mx-auto text-center">
                <Link href="/products" className={styles.continue}>
                    Continue Shopping
                </Link>
            </div>

        </main>

    );
}
