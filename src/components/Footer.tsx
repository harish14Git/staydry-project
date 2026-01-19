"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/src/styles/Footer.module.css";

import Footerlogo from "../../public/Assets/Footer-logo.jpeg";
import call from "../../public/Assets/phone-call.png";
import mail from "../../public/Assets/mail.png";
import facebook from "../../public/Assets/facebook.png";
import linkedin from "../../public/Assets/linkedin.png";
import instagram from "../../public/Assets/instagram.png";

const Footer = () => {
  const [email, setEmail] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    if (!agreed) {
      setMessage("Please accept the privacy policy");
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

      const data: { error?: string } = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessage("Subscribed successfully 🎉");
      setEmail("");
      setAgreed(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>

        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.contact}>
            <Image
              src={Footerlogo}
              alt="Staydry Footer Logo"
              width={60}
              height={30}
            />

            <a href="tel:8122884357" className={styles.contactRow}>
              <Image src={call} alt="Call Icon" width={20} height={20} />
              <span className={styles.callText}>Call</span>
            </a>

            <a href="mailto:harish@ozzi.tech" className={styles.mailRow}>
              <Image src={mail} alt="Mail Icon" width={20} height={20} />
              <span className={styles.mailText}>Send an Email</span>
            </a>

            <div className={styles.copy}>
              <p>© 2025 Staydry</p>
              <p>ABN 67167519039</p>
            </div>
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
                required
              />
              <label
                className={`${styles.floatingLabel} ${email ? styles.active : ""
                  }`}
              >
                Join our newsletter
              </label>

              <button
                className={styles.button}
                onClick={handleSubmit}
                disabled={loading}
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
                I would like to receive newsletters and have read the
                <strong> Privacy Policy</strong>
              </span>
            </label>

            {message && <p className={styles.message}>{message}</p>}
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

          {/* SOCIAL */}
          <div className={styles.socialRow}>
            <div className={styles.brandText}>
              <strong className={styles.brand}>STAYDRY</strong>
              <span> — Shop our brand and find your dry style.</span>
            </div>

            <div className={styles.icons}>
              <div className={styles.iconBox}>
                <Image src={facebook} alt="Facebook" fill />
              </div>

              <div className={styles.iconBox}>
                <Image src={linkedin} alt="LinkedIn" fill />
              </div>

              <div className={styles.iconBox}>
                <Image src={instagram} alt="Instagram" fill />
              </div>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
