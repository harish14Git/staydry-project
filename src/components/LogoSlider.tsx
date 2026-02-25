"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "@/src/styles/LogoSlider.module.css";

const logos = [
  { src: "/Assets/paypal.png", alt: "PayPal" },
  { src: "/Assets/paylater.png", alt: "paylater" },
  { src: "/Assets/mastercard.png", alt: "Mastercard" },
  { src: "/Assets/visa.png", alt: "Visa" },
  { src: "/Assets/ndis.png", alt: "NDIS" },
  { src: "/Assets/ned.png", alt: "NED" },
];

export default function LogoSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trackRef.current) {
      const halfWidth = trackRef.current.scrollWidth / 2;
      trackRef.current.style.setProperty(
        "--scroll-distance",
        `-${halfWidth}px`
      );
    }
  }, []);

  return (
    <section className={styles.logoSection}>
      <div className={styles.container}>
        <div className={styles.slider}>
          <div ref={trackRef} className={styles.track}>
            {[...logos, ...logos].map((logo, index) => (
              <div className={styles.logo} key={index}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={60}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.divider} />
    </section>
  );
}
