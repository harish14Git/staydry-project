"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");


  const [showPopup, setShowPopup] = useState(false);


  const [submittedData, setSubmittedData] = useState<null | {
    name: string;
    email: string;
    phone: string;
  }>(null);

  // VALIDATIONS
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const isPhoneValid = phone.length === 10;
  const isNameValid = /^[A-Za-z\s]+$/.test(name);


  const isFormValid =
    name.trim() !== "" &&
    isNameValid &&
    date.trim() !== "" &&
    isEmailValid &&
    isPhoneValid;


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        date,
        message,
      }),
    });

    if (response.ok) {
      setSubmittedData({ name, email, phone });
      setShowPopup(true);
      handleReset();
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDate("");
    setMessage("");
  };

  return (
    <main className={styles.page}>

      {/* SUCCESS POPUP */}
      {showPopup && submittedData && (
        <div className={styles.popup}>
          <h3>✅ Message Sent Successfully</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone:</strong> {submittedData.phone}</p>
          <button
            className={styles.closeButton}
            onClick={() => setShowPopup(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* HEADER */}
      <section className={styles.header}>
        <h1 className={styles.title}>Customer Care</h1>
        <h3 className={styles.question}>
          Have questions or curious about something in particular?
        </h3>
        <p className={styles.description}>
          We want to make your shopping experience as smooth as possible.
          If you have any questions, feel free to contact us.
        </p>
      </section>

      {/* CONTENT */}
      <section className={styles.content}>
        {/* LEFT */}
        <div className={styles.left}>
          <ContactItem image="/Assets/chat.png" title="Live Chat" text1="Mon–Fri" text2="9am–5pm AEST" />
          <ContactItem image="/Assets/phone-call.png" title="Call Us" text1="8100 684 878" text2="9am–5pm AEST" />
          <ContactItem image="/Assets/mail.png" title="Email" text1="Send an Email" text2="" />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className={styles.form}>

          <label>
            Name <span className={styles.required}>*</span>
          </label>

          <div className={styles.inputWrapper}>
            <input
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-z\s]*$/.test(value)) {
                  setName(value);
                }
              }}
              required
            />

            {name && !isNameValid && (
              <span className={styles.tooltip}>
                Name should contain only letters
              </span>
            )}
          </div>


          <label>
            Phone Number <span className={styles.required}>*</span>
          </label>
          <input
            value={phone}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,10}$/.test(value)) {
                setPhone(value);
              }
            }}
            required
          />
          {phone && phone.length !== 10 && (
            <p className={styles.error}>Invalid phone number (must be 10 digits)</p>
          )}

          <label>
            Email <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            required
          />
          {email && !isEmailValid && (
            <p className={styles.error}>Invalid email address</p>
          )}

          <label>
            Preferred date for callback <span className={styles.required}>*</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          {/* COMMENT OPTIONAL */}
          <textarea
            placeholder="Comment (optional)"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className={styles.buttons}>
            <button type="submit" disabled={!isFormValid}>
              Submit
            </button>

            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </div>

        </form>
      </section>
    </main>
  );
}

/* CONTACT ITEM */
function ContactItem({
  image,
  title,
  text1,
  text2,
}: {
  image: string;
  title: string;
  text1: string;
  text2: string;
}) {
  return (
    <div className={styles.contactItem}>
      <Image src={image} alt={title} width={40} height={40} />
      <div>
        <h4>{title}</h4>
        <p>{text1}</p>
        {text2 && <p>{text2}</p>}
      </div>
    </div>
  );
}
