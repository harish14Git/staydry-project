"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "@/src/styles/Navbar.module.css";
import call from "@/public/Assets/svg-image-4.svg"

import logoBlack from "@/public/Assets/Staydry.svg";
import logoKids from "@/public/Assets/Staydry Kids.svg";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      {/* ───── TOP STRIP ───── */}
      <div className={styles.topStrip}>
        {/* LEFT: LOGOS */}
        <div className={styles.brandRow}>
          <Link href="/" className={styles.brandLeft}>
            <Image src={logoBlack} alt="Staydry" width={110} height={32} />
          </Link>

          <div className={styles.brandKids}>
            <Image src={logoKids} alt="Staydry Kids" width={120} height={36} />
          </div>
        </div>

        {/* RIGHT: ICONS */}
        <div className={styles.actions}>
          <Link href="/products" className={styles.iconBtn}>
            <SearchIcon />
          </Link>

          <span className={styles.divider} />
          <Link href="/contact" className={styles.actionItem}>
            <Image
              src={call}
              alt="Call"
              width={20}
              height={20}
              className={styles.icon}
              priority
            />
          </Link>


          <span className={styles.divider} />

          <Link href="/cart" className={styles.iconBtn}>
            <CartIcon />
            <span className={styles.iconText}>Cart</span>
          </Link>

          <button
            className={styles.menuBtn}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
<span className={styles.hrstyle}><hr></hr></span>
      {/* ───── DESKTOP NAV LINKS ───── */}
      <nav className={styles.mainNav}>
        <Link href="/products">Shop All</Link>
        <Link href="/products#underwear">
          Underwear
        </Link>
        <Link href="/products#bedding">Bedding & Home</Link>
        <Link href="/products#bundles">Bundles</Link>
        <Link href="/products#mobility">Mobility</Link>
      </nav>

      {/* ───── MOBILE MENU ───── */}
      {open && (
        <div className={styles.mobileMenu}>
          <Link href="/products" onClick={() => setOpen(false)}>Shop All</Link>
          <Link href="/products#underwear" onClick={() => setOpen(false)}>Underwear</Link>
          <Link href="/products#bedding" onClick={() => setOpen(false)}>Bedding & Home</Link>
          <Link href="/products#bundles" onClick={() => setOpen(false)}>Bundles</Link>
          <Link href="/products#mobility" onClick={() => setOpen(false)}>Mobility</Link>
        </div>
      )}
    </header>
  );
}

/* ───── SVG ICONS ───── */

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6h15l-1.5 9h-12z" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  );
}


function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
