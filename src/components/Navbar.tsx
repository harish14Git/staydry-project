"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import logo from "../../public/Assets/my-logo-img.png";
import call from "../../public/Assets/phone-call.png";
import { Style_Script } from "next/font/google";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LEFT: LOGO */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="Logo" width={45} height={45} priority />
            <h1 className="text-2xl font-bold text-orange-500 tracking-wide">
              STAYDRY
            </h1>
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          {/* SEARCH */}
          <Link href="/products" className="flex items-center gap-1">
            <SearchIcon />
            <span className="hidden sm:inline">Search</span>
          </Link>

          {/* CART */}
          <Link href="/cart" className="flex items-center gap-1">
            <CartIcon />
            <span className="hidden sm:inline">Cart</span>
          </Link>

          {/* CONTACT */}
          <Link href="/contact" className="flex items-center gap-2">
            <Image src={call} alt="Call Icon" width={22} height={22} />
            <span className="font-semibold hidden sm:inline">Contact</span>
          </Link>

          {/* MENU BUTTON */}
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

      {/* MOBILE / MENU DROPDOWN */}
      {open && (
        <nav className="bg-white shadow-lg">
          <ul className="flex flex-col gap-4 px-6 py-6 text-center font-medium">

            <li className="text-gray-700 hover:text-orange-500 font-medium">
              <Link href="/products" onClick={() => setOpen(false)}>
                Shop All
              </Link>
            </li>
            <li className="text-gray-700 hover:text-orange-500 font-medium">
              <Link href="/products#underwear" onClick={() => setOpen(false)}>
                Underwear
              </Link>
            </li>
            <li className="text-gray-700 hover:text-orange-500 font-medium">
              <Link href="/products#bedding" onClick={() => setOpen(false)}>
                Bedding & Home
              </Link>
            </li>
            <li className="text-gray-700 hover:text-orange-500 font-medium">
              <Link href="/products#mobility" onClick={() => setOpen(false)}>
                Mobility
              </Link>
            </li>
            <li className="text-gray-700 hover:text-orange-500 font-medium">
              <Link href="/products#training" onClick={() => setOpen(false)}>
                Toilet Training
              </Link>
            </li>
            <li className="text-gray-700 hover:text-orange-500 font-medium">
              <Link href="/products#bundles" onClick={() => setOpen(false)}>
                Bundles
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

/* ---------------- ICONS ---------------- */

function SearchIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386L5.82 7.5m0 0L7.5 15.75h9.75L19.5 7.5H5.82z"
      />
    </svg>
  );
}
