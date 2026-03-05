"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "@/src/styles/ProductDetails.module.css";
import Image from "next/image";
import back from "@/public/Assets/back-button.png";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from "@/src/services/product-api";
import { useDispatch, useSelector} from "react-redux";
import { addToCart } from "@/src/store/cartSlice";
import { ProductsResponse, Product as ProductType } from "@/src/types/product-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ProductImageSwiper from "@/src/components/ProductImageSwiper";
import { toggleWishlist } from "@/src/store/wishlistSlice";
import type { RootState } from "@/src/store/store";


interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  images: string[];
  description: string;
  stock: number;
  category: string;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id as string),
    enabled: !!id,
  });

  const { data: relatedData } = useQuery<ProductsResponse>({
    queryKey: ["related", product?.category],
    queryFn: () => fetchProducts(1, 10, "", product!.category),
    enabled: !!product?.category,
  });

  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const isWishlisted = (id: number) => wishlist.some(i => i.id === id);
  const relatedProducts = relatedData?.products.filter((p) => p.id !== product?.id) ?? [];

  if (isLoading) return <p>Loading Product...</p>;
  if (isError) return <p>Product not found</p>;
  if (!product) return null;

  const maxStock = product.stock;

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity,
    }));

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <main className={`${styles.page} mx-auto px-4 md:px-8`}>

      <button onClick={() => router.back()} className={styles.backBtn}>
        <Image src={back} alt="Move to back" width={30} height={30} />
      </button>

      <div className={styles.container}>

         <ProductImageSwiper images={product.images} title={product.title} />


        <div className={styles.info}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>₹ {product.price}</p>

          <div className={styles.qtyBox}>
            <button onClick={() => setQuantity(q => q - 1)} disabled={quantity === 1}>
              −
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} disabled={quantity === maxStock}>
              +
            </button>
          </div>

          <button className={styles.cartBtn} onClick={handleAddToCart}>
            Add to Cart
          </button>

          <button
  className={`${styles.wishlistBtn} ${isWishlisted(product.id) ? styles.wishlisted : ""}`}
  onClick={(e) => {
    e.stopPropagation(); 
    dispatch(toggleWishlist({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    }));
  }}
>
  {isWishlisted(product.id) ? "❤️" : "🤍"}
</button>

          {showPopup && (
            <div className={styles.cartPopup}>
              ✅ Added to cart!
            </div>
          )}
        </div>
      </div>

     {relatedProducts.length > 0 && (
  <div className={styles.relatedSection}>
    <h2 className={styles.relatedTitle}>Related Products</h2>
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={16}
      slidesPerView={2}
      breakpoints={{
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      className={styles.relatedSwiper}
    >
      {relatedProducts.map((p: ProductType) => (
        <SwiperSlide key={p.id}>
          <div
            className={styles.sliderCard}
            onClick={() => router.push(`/products/${p.id}`)}
          >
            <Image src={p.thumbnail} alt={p.title} className={styles.sliderImage} width={200} height={200} />
            <p className={styles.sliderTitle}>{p.title}</p>
            <p className={styles.sliderPrice}>₹ {p.price}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
)}

    </main>
  );
}
