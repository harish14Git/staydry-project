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
            <div className="relative w-full h-[90vh] overflow-hidden">
              {/* MEDIA */}
              {slide.type === "image" ? (
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  unoptimized
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
              <div className="absolute inset-0 bg-black/40" />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-24 text-white">
                <div className="max-w-2xl">
                  {/* BIG HEADING */}
                  <h1 className="text-[36px] md:text-[58px] font-extrabold leading-tight mb-4">
                    {slide.title}
                  </h1>

                  {/* STAGGERED SUBTITLE */}
                  <div className="mt-16 md:mt-24 text-center">
                  <p className="ml-6 md:ml-10 text-[16px] md:text-[18px] font-medium mb-6">
                    {slide.subtitle}
                  </p>

                  {/* BUTTON ALIGNED WITH SUBTITLE */}
                  <div className="ml-6 md:ml-20">
                    <Link
                      href={slide.link}
                      className="inline-block bg-orange-600 hover:bg-orange-700 transition px-8 py-3 rounded-full font-semibold text-sm md:text-base"
                    >
                      {slide.button}
                    </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* CATEGORY STRIP */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-6 md:gap-16 px-4 w-full md:w-auto justify-center">

                {slides.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-sm font-semibold"
                  >
                    {/* DIVIDER */}
                    <div
                      className={`h-[2px] w-20 mb-2 transition-all ${
                        activeSlide === i
                          ? "bg-white"
                          : "bg-white/40"
                      }`}
                    />

                    {/* TEXT */}
                    <span
                      className={`transition ${
                        activeSlide === i
                          ? "text-white"
                          : "text-white/60"
                      }`}
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