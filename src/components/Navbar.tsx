"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "@/src/styles/Navbar.module.css";
import call from "@/public/Assets/svg-image-4.svg";
import logoBlack from "@/public/Assets/Staydry.svg";
import logoKids from "@/public/Assets/Staydry Kids.svg";
import { useSelector } from "react-redux";          
import type { RootState } from "@/src/store/store"; 
import { useDispatch } from "react-redux";
import { toggleWishlist } from "@/src/store/wishlistSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // read cart from Redux store instead of React Query
  const cart = useSelector((state: RootState) => state.cart.items);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  return (
    <header className={`${styles.navbar} mx-auto px-4 md:px-8`}>
      {/* TOP STRIP */}
      <div className={styles.topStrip}>
        <div className={styles.brandRow}>
          <Link href="/" className={styles.brandLeft}>
            <Image src={logoBlack} alt="Staydry" width={110} height={32} />
          </Link>
          <div className={styles.brandKids}>
            <Image src={logoKids} alt="Staydry Kids" width={120} height={36} />
          </div>
        </div>

        <button
          className={`${styles.menuBtn} ${styles.desktopMenu} hidden lg:flex`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <><p>Menu</p> <CloseIcon /></> : <><p>Menu</p> <MenuIcon /></>}
        </button>
      </div>

      <span className={styles.hrstyle}>
        <hr />
      </span>

      <div className="flex justify-end lg:justify-between">
        <nav className={styles.mainNav}>
          <Link href="/products">Shop All</Link>
          <Link href="/products#underwear">Underwear</Link>
          <Link href="/products#bedding">Bedding & Home</Link>
          <Link href="/products#bundles">Bundles</Link>
          <Link href="/products#mobility">Mobility</Link>
        </nav>

        <div className={styles.actions}>
          <Link href="/products" className={`lg:hidden ${styles.iconBtnserach}`}>
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
            />
          </Link>
          <span className={styles.iconTextcall}>Call</span>

          <span className={styles.divider} />
          <Link href="/products" className={`hidden lg:block ${styles.iconBtnserach}`}>
            <SearchIcon />
          </Link>

          <button className={styles.iconBtn} onClick={() => setWishlistOpen(true)}>
  <span className={styles.iconText}>
    Wishlist{" "}
    {wishlist.length > 0 && (
      <span className={styles.cartBadge}>{wishlist.length}</span>
    )}
  </span>
</button>

          <Link href="/cart" className={styles.iconBtn}>
            <span className={styles.iconText}>
              Cart{" "}
              {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems}</span>
              )}
            </span>
          </Link>

          <button
            className={`${styles.menuBtn} ${styles.desktopMenu} lg:hidden`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className={`${styles.mobileMenu} ${open ? styles.menuOpen : styles.menuClosed}`}>
          <Link href="/products" onClick={() => setOpen(false)}>Shop All</Link>
          <Link href="/products#underwear" onClick={() => setOpen(false)}>Underwear</Link>
          <Link href="/products#bedding" onClick={() => setOpen(false)}>Bedding & Home</Link>
          <Link href="/products#bundles" onClick={() => setOpen(false)}>Bundles</Link>
          <Link href="/products#mobility" onClick={() => setOpen(false)}>Mobility</Link>
        </div>
      )}


      {/* Wishlist Slide Panel */}
{wishlistOpen && (
  <div className={styles.wishlistOverlay} onClick={() => setWishlistOpen(false)} />
)}

<div className={`${styles.wishlistPanel} ${wishlistOpen ? styles.panelOpen : ""}`}>
  <div className={styles.panelHeader}>
    <h2>My Wishlist</h2>
    <button onClick={() => setWishlistOpen(false)}>✕</button>
  </div>

  {wishlist.length === 0 ? (
    <p className={styles.emptyWishlist}>No items in wishlist 🤍</p>
  ) : (
    <div className={styles.wishlistItems}>
      {wishlist.map((item) => (
        <div key={item.id} className={styles.wishlistItem}>
          <Image src={item.thumbnail} alt={item.title} className={styles.wishlistThumb} width={50} height={50} />
          <div className={styles.wishlistInfo}>
            <p className={styles.wishlistTitle}>{item.title}</p>
            <p className={styles.wishlistPrice}>₹ {item.price}</p>
          </div>
          <button
            className={styles.removeWishlist}
            onClick={() => dispatch(toggleWishlist(item))}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )}
</div>

    </header>
  );
}

/* Icons */
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
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

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="3" x2="21" y2="21" />
      <line x1="21" y1="3" x2="3" y2="21" />
    </svg>
  );
}