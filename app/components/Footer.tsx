
import Image from "next/image";
import styles from "./Footer.module.css";
import Footerlogo from "../../public/Assets/Footer-logo.jpeg";
import call from "../../public/Assets/phone-call.png";
import mail from "../../public/Assets/mail.png";
import facebook from "../../public/Assets/facebook.png";
import linkedin from "../../public/Assets/linkedin.png";
import instagram from "../../public/Assets/instagram.png";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* MAIN WRAPPER */}
      <div className={styles.wrapper}>

        {/* LEFT COLUMN */}
        <div className={styles.left}>

          <div className={styles.contact}>
            <Image
              src={Footerlogo}
              alt="Staydry Footer Logo"
              width={60}
              height={30}
            />

            {/* CALL ROW */}
            <div className={styles.contactRow}>
              <Image
                src={call}
                alt="Call Icon"
                width={20}
                height={20}
              />
              <span className={styles.callText}>Call</span>
            </div>
            {/* MAIL COL */}
            <div className={styles.mailRow}>
              <Image
                src={mail}
                alt="Mail Icon"
                width={20}
                height={20}
              />
              <span className={styles.mailText}>Send an Email</span>
            </div>

          </div>


          <div className={styles.copy}>
            <p>© Copyright 2025 Staydry</p>
            <p>ABN 67167519039</p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.right}>

          {/* NEWSLETTER */}
          <div className={styles.newsletter}>
            <div className={styles.newsHeader}>
              <h4>Join our newsletter</h4>
              <button className={styles.button}>Submit</button>
            </div>

            <label className={styles.checkbox}>
              <input type="checkbox" />
              I would like to receive newsletters from Staydry and have read the
              <span> Privacy Policy</span>
            </label>
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

          <div className={styles.socialRow}>

            <pre className={styles.brandText}>
              <strong className={styles.brand}>STAYDRY</strong>  <span className="ps-15">—————  Shop our brand and find your dry style.</span> 
            </pre>
            <div className={styles.icons}>
              <Image src={facebook} alt="Facebook Icon" width={29} height={29} />
              <Image src={linkedin} alt="LinkedIn Icon" width={24} height={24} />
              <Image src={instagram} alt="Instagram Icon" width={24} height={24} />
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
