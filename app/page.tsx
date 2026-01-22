import Link from "next/link";
import React from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import styles from "@/src/styles/Home.module.css";
import HeroSlider from "@/src/components/HeroSlider";
import ShopYourWay from "@/src/components/ShopYourWay";
import LogoSlider from "@/src/components/LogoSlider";

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <ShopYourWay />
      <LogoSlider />
    </main>
  );
}
