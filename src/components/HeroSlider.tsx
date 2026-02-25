"use client";

import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const slides = [
  {
    type: "image",
    src: "/Assets/hero1.jpg",
    title: "Dry-Stylin, never felt so good.",
    subtitle: "Discover why people of all ages are feeling their groove.",
    button: "Explore Underwear",
    link: "/products",
    category: "Underwear",
  },
  {
    type: "image",
    src: "/Assets/hero2.jpg",
    title: "Reusable Bed Pads",
    subtitle: "Waterproof comfort without compromise.",
    button: "Shop Bed Pads",
    link: "/products#pads",
    category: "Reusable Bed Pads",
  },
  {
    type: "image",
    src: "/Assets/hero3.jpg",
    title: "Comfort That Moves With You",
    subtitle: "Soft protection for everyday confidence.",
    button: "Explore Bedding",
    link: "/products#bedding",
    category: "Bedding",
  },
  {
    type: "video",
    src: "/Assets/promo.mp4",
    title: "NDIS Approved Essentials",
    subtitle: "Support you can trust.",
    button: "Learn More",
    link: "/about",
    category: "NDIS",
  },
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4500,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
  };

  return (
    <section className="w-full">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="relative w-full h-[90vh] md:h-[90vh] overflow-hidden">
              {/* MEDIA */}
              {slide.type === "image" ? (
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
              ) : (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              )}

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/10 md:bg-black/25  mx-auto px-4 md:px-8" />

              {/* BIG HEADING */}
              <div className="absolute inset-0 text-white pointer-events-none">
                <div className="absolute left-[12px] md:left-[6%] top-[56%] -translate-y-1/2 max-w-4xl">
                  <h1 className=" font-extrabold leading-[1.05] text-[clamp(2.2rem,6vw,4.8rem)] ">
                    {slide.title}
                  </h1>
                </div>
              </div>

              {/* SUBTITLE + CTA */}
              <div className=" absolute left-[12px] bottom-28 md:left-auto md:right-[32%] md:bottom-16 md:max-w-[360px] max-w-md text-white">
                <p className=" mb-10 leading-relaxed text-[clamp(1.15rem,5.5vw,1.1rem)] md:text-[15px] ">
                  {slide.subtitle}
                </p>

                <Link
                  href={slide.link}
                  className=" inline-flex items-center justify-center rounded-full font-semibold bg-orange-600 hover:bg-orange-700 transition px-10 py-4
 md:px-6 md:py-3
      text-[clamp(0.95rem,4.5vw,1rem)]
    "
                >
                  {slide.button}
                </Link>
              </div>

              {/* MOBILE CATEGORY STRIP */}
              <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] flex justify-between text-white text-[13px]">
                {slides.map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span
                      className={`h-[1px] w-12 ${
                        activeSlide === i ? "bg-white" : "bg-white/40"
                      }`}
                    />
                    <span
                      className={
                        activeSlide === i ? "text-white" : "text-white/70"
                      }
                    >
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>

              {/* DESKTOP CATEGORY STRIP */}
              <div className="hidden md:flex absolute bottom-10 right-24 gap-10 text-white">
                {slides.map((item, i) => (
                  <div key={i} className="flex flex-col gap-2 text-sm">
                    <span
                      className={`h-[1px] w-24 ${
                        activeSlide === i ? "bg-white" : "bg-white/40"
                      }`}
                    />
                    <span
                      className={
                        activeSlide === i ? "text-white" : "text-white/60"
                      }
                    >
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
