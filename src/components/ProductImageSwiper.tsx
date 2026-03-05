"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import styles from "@/src/styles/ProductDetails.module.css";

interface ProductImageSwiperProps {
  images: string[];
  title: string;
}

export default function ProductImageSwiper({ images, title }: ProductImageSwiperProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <>
      <div className={styles.thumbnailStrip}>
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          direction="vertical"
          slidesPerView={4}
          spaceBetween={10}
          className={styles.thumbSwiper}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`thumb-${index}`} className={styles.thumb} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.imageWrapper}>
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          spaceBetween={10}
          slidesPerView={1}
          className={styles.mainSwiper}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`${title} ${index + 1}`} className={styles.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}