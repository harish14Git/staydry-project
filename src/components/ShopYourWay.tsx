"use client";

import Image from "next/image";
import styles from "@/src/styles/ShopYourWay.module.css";

const items = [
  {
    title: "Save 30% off Bundles",
    image: "/Assets/bundles.jpg",
  },
  {
    title: "Continence Underwear",
    image: "/Assets/underwear.jpg",
  },
  {
    title: "Mobility Sheet",
    image: "/Assets/mobility.jpg",
  },
  {
    title: "Kids Toilet Training",
    image: "/Assets/kids.jpg",
  },
];

export default function ShopYourWay() {
  return (
    <>
      {/* SHOP SECTION */}
      <section className={styles.shop}>
        <p className={styles.label}>
          00 — <strong>Shop your way</strong>
        </p>

        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.title} className={styles.card}>
              <Image
                src={item.image}
                alt={item.title}
                width={300}   // Set width and height instead of `fill` for better layout
                height={200}
                className={styles.image}
              />
              <span className={styles.fav}>☆</span>
              <div className={styles.cta}>{item.title}</div>
            </div>
          ))}
        </div>

        <div className={styles.featureWrapper}>
          <div className={styles.featureBar}>
            <div className={styles.featureLeft}>
              <div className={styles.featureItem}>
                <span className={styles.icon}>
                  <Image src="/Assets/waterproof.png" alt="Waterproof" width={40} height={40} />
                </span>
                <span>100% Waterproof</span>
              </div>

              <div className={styles.featureItem}>
                <span className={styles.icon}>
                  <Image src="/Assets/guarantee.png" alt="Guarantee" width={40} height={40} />

                </span>
                <span>Comfy Guarantee</span>
              </div>

              <div className={styles.featureItem}>
                <span className={styles.icon}>
                  <Image src="/Assets/paylater.png" alt="Pay Later" width={40} height={40} />
                </span>
                <span>Pay Later</span>
              </div>
            </div>

            <div className={styles.featureRight}>
              <p>
                All of our products are eligible for <strong>NDIS funding</strong>
              </p>
              <button>Find out how</button>
            </div>
          </div>

          <div className={styles.divider} />
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <p className={styles.aboutText}>
            We make products that keep our customers dry, secure and confident.
            Some may see our products used for incontinence. We just see them as
            everyday body essentials – enablers for a happy life.
          </p>
        </div>
      </section>
    </>
  );
}
