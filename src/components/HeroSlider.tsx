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

              {/* OVERLAY (lighter on mobile) */}
              <div className="absolute inset-0 bg-black/10 md:bg-black/25  mx-auto px-4 md:px-8" />

              {/* BIG HEADING — centered on mobile, lower on desktop */}
              <div className="absolute inset-0 flex items-center justify-center md:block text-white">
                <div className="px-4 sm:px-6 md:px-0 md:max-w-4xl md:absolute md:top-52 md:left-24">
                  <h1 className="text-[28px] sm:text-[36px] md:text-[72px] font-extrabold leading-tight text-center md:text-left">
                    {slide.title}
                  </h1>
                </div>
              </div>

              {/* SUBTITLE + CTA */}
              <div className="absolute bottom-24 md:bottom-14 left-1/2 md:left-[24%] -translate-x-1/2 md:-translate-x-0 w-[90%] md:w-auto max-w-md text-white text-left">
                <p className="text-[14px] md:text-[17px] font-medium mb-4">
                  {slide.subtitle}
                </p>

                <Link
                  href={slide.link}
                  className="inline-block bg-orange-600 hover:bg-orange-700 transition px-8 py-3 rounded-full font-semibold text-sm"
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
