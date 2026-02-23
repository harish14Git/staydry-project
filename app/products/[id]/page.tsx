"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/src/components/Navbar";
import styles from "@/src/styles/ProductDetails.module.css";
// import { useCart } from "@/src/context/CartContext";
import Image from "next/image";
import back from "@/public/Assets/back-button.png";
import {useQuery} from "@tanstack/react-query";
import { fetchProductById } from "@/src/services/product-api";

import{ useMutation, useQueryClient} from "@tanstack/react-query";
import { addToCart } from "@/src/services/cart-api";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  stock: number;
}
interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}
export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  // const { addToCart } = useCart();

  // const [product, setProduct] = useState<Product | null>(null);
  // const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const queryClient = useQueryClient();
  const addMutation = useMutation<CartItem[], Error, CartItem, { previousCart?: CartItem[] }>({
  mutationFn: addToCart,

 onMutate: async (newItem) => {
  await queryClient.cancelQueries({ queryKey: ["cart"] });

  const previousCart = queryClient.getQueryData<CartItem[]>(["cart"]);

  queryClient.setQueryData<CartItem[]>(["cart"], (old = []) => {
    const existingItem = old.find(item => item.id === newItem.id);

    if (existingItem) {
      return old.map(item =>
        item.id === newItem.id
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      );
    }

    return [...old, newItem];
  });

  return { previousCart };
},

  onError: (_err, _newItem, context) => {
    if (context?.previousCart) {
      queryClient.setQueryData(["cart"], context.previousCart);
    }
  },

  onSuccess: (newCart) => {
    queryClient.setQueryData(["cart"], newCart);

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  },
});

  // useEffect(() => {
  //   fetch(`https://dummyjson.com/products/${id}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       setProduct(data);
  //       setLoading(false);
  //     })
  //     .catch(() => setLoading(false));
  // }, [id]);
  const { data:product, isLoading, isError} = useQuery<Product>({
    queryKey:["product", id],
    queryFn: () => fetchProductById(id as string),
    enabled: !!id,
  })

if(isLoading) return <p>Loading Product...</p>;
if(isError) return <p>Product not found</p>;
if(!product) return null;

  const maxStock = product.stock;

  // const handleAddToCart = () => {
  //   addToCart({
  //     id: Number(id),
  //     title: product.title,
  //     price: product.price,
  //     thumbnail: product.thumbnail,
  //     quantity,
  //   });

  //   setShowPopup(true);

  //   // hide popup after 2 seconds
  //   setTimeout(() => {
  //     setShowPopup(false);
  //   }, 2000);
  // };

  return (
    <main className={`${styles.page}  mx-auto px-4 md:px-8`}>
     
      <button onClick={() => router.back()} className={styles.backBtn}>
        <Image
          src={back}
          alt="Move to back"
          width={30}
          height={30}
        />
      </button>

      <div className={styles.container}>
        <img src={product.thumbnail} alt={product.title} className={styles.image} />

        <div className={styles.info}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>₹ {product.price}</p>

          {/* <div className={styles.qtyBox}>
            <button
              onClick={() => setQuantity(q => q - 1)}
              disabled={quantity === 1}
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              onClick={() => setQuantity(q => q + 1)}
              disabled={quantity === maxStock}
            >
              +
            </button>
          </div> */}

          <button
  className={styles.cartBtn}
  onClick={() =>
    addMutation.mutate({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity,
    })
  }
  disabled={addMutation.isPending}
>
  {addMutation.isPending ? "Adding..." : "Add to Cart"}
</button>

          {showPopup && (
            <div className={styles.cartPopup}>
              ✅ Added to cart
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
