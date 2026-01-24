"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/src/styles/Footer.module.css";
import staydrytext from "@/public/Assets/staydrytext.svg";
import Footerlogo from "../../public/Assets/OrangeLogo.svg";
import mail from "@/public/Assets/mail.svg";
import phone from "../../public/Assets/svg-image-4.svg";
import facebook from "@/public/Assets/facebook.svg";
import linkedin from "@/public/Assets/linkedin.svg";
import instagram from "@/public/Assets/instagram.svg";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        {/* LEFT COLUMN */}

        <div className={styles.logo}>
          <Image src={Footerlogo} alt="Staydry" width={48} height={42} />
        </div>

        <div className={styles.contactBlock}>
          <div className={`${styles.contactRow} font-black`}>
            <Image src={phone} alt="Call" width={20} height={20} />
            <span>Call Us</span>
          </div>
          <div className={styles.contactRow}>
            <Image src={mail} alt="Email" width={18} height={18} />
            <span>Send an Email</span>
          </div>
        </div>

        {/* CENTER COLUMN */}

        <div className={styles.newsletter}>
          <div className={`${styles.inputWrapper} relative`}>
            <input
              className={styles.newsInput}
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="newsletter"
            />

            <label htmlFor="newsletter" className={styles.floatingLabel}>
              Join our newsletter
            </label>

            <button className={styles.button}>Submit</button>
          </div>

          <div className={styles.check}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                I would like to receive newsletters from Staydry and have read
                the <strong> Privacy Policy</strong>
              </span>
            </label>
          </div>
        </div>

        <div className={styles.linkGroups}>
          <ul>
            <li>Our Brand</li>
            <li>Account</li>
            <li>NDIS</li>
            <li>Returns</li>
            <li>Terms of Service</li>
          </ul>
          <ul>
            <li>Customer Care</li>
            <li>Stockists</li>
            <li>Shipping</li>
            <li>FAQs</li>
            <li>Accessibility</li>
          </ul>
        </div>

        <div className={styles.footerbrand}>
          <Image
            src={staydrytext}
            alt="STAYDRY"
            height={24}
            className={styles.brandLogo}
          />

          <span className={styles.line}></span>
          <span className={styles.tagline}>
            Shop our brands and find your dry style.
          </span>
        </div>

        {/* BOTTOM BAR */}

        <div className={styles.botline}>
          <p>&copy; Copyright 2025 Staydry</p>
          <p> ABN 67167519039</p>
        </div>
        <div className={styles.socialRight}>
          <Image
            src={facebook}
            alt="fb"
            width={22}
            height={22}
            className={styles.socialIcon}
          />
          <Image
            src={linkedin}
            alt="in"
            width={22}
            height={22}
            className={styles.socialIcon}
          />
          <Image
            src={instagram}
            alt="ig"
            width={22}
            height={22}
            className={styles.socialIcon}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
