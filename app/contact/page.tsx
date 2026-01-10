"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });

    if (response.ok) {
      alert("Thank you! Your message has been sent.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  const isFormValid =
    name.trim() &&
    phone.trim() &&
    message.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <main className={styles.page}>
      {/* HEADER */}
      <section className={styles.header}>
        <h1 className={styles.title}>Customer Care</h1>
        <h3 className={styles.question}>Have questions or curious about something in particular?</h3>
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
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <input placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />Preffered date for callback
          <input type="date" />

          <textarea
            placeholder="Comment"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
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

      {/* CTA */}
      <section className={styles.bottom}>
        <h2 className={styles.CTAText}>Still looking for answers good advice or just a real human to guide your through the process?</h2>
        <button>Chat with us right here</button>
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
