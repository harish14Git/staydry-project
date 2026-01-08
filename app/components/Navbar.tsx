"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import logo from "../../public/Assets/my-logo-img.png";
import call from "../../public/Assets/phone-call.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LEFT: LOGO */}
        <div className="flex items-center gap-3">      
          <Link href="/" className="nav-link"><Image src={logo} alt="Logo" width={45} height={45} priority /></Link>

          <Link href="/" className="nav-link"><h1 className="text-2xl font-bold text-orange-500 tracking-wide">
            STAYDRY
          </h1></Link>
        </div>

        {/* CENTER: NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/products" className="nav-link">Shop All</Link>
          <Link href="/products#underwear" className="nav-link">Underwear</Link>
          <Link href="/products#bedding" className="nav-link">Bedding & Home</Link>
          <Link href="/products#mobility" className="nav-link">Mobility</Link>
          <Link href="/products#training" className="nav-link">Toilet Training</Link>
          <Link href="/products#bundles" className="nav-link">Bundles</Link>

          {/* CALL → CONTACT */}
          <Link href="/contact" className="flex items-center">
            <Image src={call} alt="Call Icon" width={25} height={25} />
            <strong><span className="ml-2 nav-link">Call</span></strong>
          </Link>
        </nav>

        {/* RIGHT: SEARCH, CART, MENU */}
        <div className="flex items-center gap-6">
          <Link href="/products" className="icon-btn">
            <SearchIcon />
            <span>Search</span>
          </Link>

          <Link href="/products" className="icon-btn">
            <CartIcon />
            <span>Cart</span>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2"
            aria-label="Menu"
          >
            <div className="flex flex-col w-6 h-5 justify-between">
              <span className="h-0.5 bg-gray-800 rounded"></span>
              <span className="h-0.5 bg-gray-800 rounded"></span>
              <span className="h-0.5 bg-gray-800 rounded"></span>
            </div>
            <span className="text-sm font-medium">Menu</span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <nav className="md:hidden bg-white shadow px-6 py-4 space-y-3">
          <Link href="/products">Shop All</Link>
          <Link href="/products#underwear">Underwear</Link>
          <Link href="/products#bedding">Bedding & Home</Link>
          <Link href="/products#mobility">Mobility</Link>
          <Link href="/products#training">Toilet Training</Link>
          <Link href="/products#bundles">Bundles</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      )}
    </header>
  );
}

/* ---------------- ICONS ---------------- */

function SearchIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="m21 21-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.25 3h1.386L5.82 7.5m0 0L7.5 15.75h9.75L19.5 7.5H5.82z" />
    </svg>
  );
}