"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/src/styles/Footer.module.css";

import Footerlogo from "../../public/Assets/OrangeLogo.svg";
import mail from "../../public/Assets/mail.png";
import facebook from "../../public/Assets/facebook.png";
import linkedin from "../../public/Assets/linkedin.png";
import instagram from "../../public/Assets/instagram.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    if (!agreed) {
      setMessage("Please accept the privacy policy");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Subscription failed");

      setMessage("Subscribed successfully 🎉");
      setMessageType("success");
      setEmail("");
      setAgreed(false);
    } catch {
      setMessage("Something went wrong");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.wrapper}>

          {/* LEFT */}
          <div className={styles.left}>
            <Image src={Footerlogo} alt="Staydry" width={70} height={35} />

            <a href="tel:8122884357" className={styles.contactRow}>
              <Image src="/Assets/phone.png" alt="Call" width={20} height={20} />
              <span>Call Us</span>
            </a>

            <a href="mailto:harish@ozzi.tech" className={styles.contactRow}>
              <Image src={mail} alt="Email" width={18} height={18} />
              <span>Send an Email</span>
            </a>

            <div className={styles.copy}>
              © 2025 Staydry<br />
              ABN 67167519039
            </div>
          </div>

          {/* RIGHT */}
          <div className={styles.right}>

            {/* NEWSLETTER */}
            <div className={styles.newsletter}>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.newsInput}
                />
                <label
                  className={`${styles.floatingLabel} ${
                    email ? styles.active : ""
                  }`}
                >
                  Join our newsletter
                </label>

                <button
                  className={styles.button}
                  onClick={handleSubmit}
                  disabled={loading || !isValidEmail(email) || !agreed}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span>
                  I would like to receive newsletters and have read the{" "}
                  <strong>Privacy Policy</strong>
                </span>
              </label>

              {message && (
                <p className={`${styles.message} ${styles[messageType]}`}>
                  {message}
                </p>
              )}
            </div>

            {/* LINKS */}
            <div className={styles.links}>
              <div>
                <h5>Our Brand</h5>
                <ul>
                  <li>Account</li>
                  <li>NDIS</li>
                  <li>Returns</li>
                  <li>Terms of Service</li>
                </ul>
              </div>

              <div>
                <h5>Customer Care</h5>
                <ul>
                  <li>Stockists</li>
                  <li>Shipping</li>
                  <li>FAQs</li>
                  <li>Accessibility</li>
                </ul>
              </div>
            </div>

            {/* BOTTOM ROW */}
            <div className={styles.socialRow}>
              <div className={styles.brandText}>
                <strong className={styles.brand}>STAYDRY</strong>
                <span> — Shop our brands and find your dry style.</span>
              </div>

              <div className={styles.icons}>
                {[facebook, linkedin, instagram].map((icon, i) => (
                  <div className={styles.iconBox} key={i}>
                    <Image src={icon} alt="Social" fill />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;