"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/src/styles/products.module.css";
import Image from "next/image";
import srollup from "@/public/Assets/back-to-top.png";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "@/src/services/product-api";
import { Category } from "@/src/types/product-types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/src/store/cartSlice";

export default function ProductsPage() {
  const [sort, setSort] = useState("");
  const [showTop, setShowTop] = useState(false);
  const [page, setPage] = useState<number>(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const limit = 10;

  const dispatch = useDispatch();

  const { data: categoriesData } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
  });

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch, SetDebouncedSearch] = useState(search);
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", debouncedSearch, category],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts(pageParam, limit, debouncedSearch, category),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.length * limit;
      return totalFetched < lastPage.total ? allPages.length + 1 : undefined;
    },
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const products = data?.pages.flatMap((page) => page.products) ?? [];
  const categories: Category[] = categoriesData ?? [];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("");
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category !== "all") params.set("category", category);
    router.replace(`/products?${params.toString()}`, { scroll: false });
  }, [search, category, router]);

  useEffect(() => {
    const handler = setTimeout(() => {
      SetDebouncedSearch(search);
    }, 3000);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isError) {
    return <p>Error: {(error as Error).message}</p>;
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  const SkeletonCard = () => (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonTextShort}></div>
    </div>
  );

  return (
    <main className={`${styles.page} mx-auto px-4 md:px-8`}>

      <div className={styles.headerRow}>
        <h1 className={styles.shopTitle}>Shop All</h1>
        <div className={styles.categorySection}>
          <p className={styles.categoryLabel}>Select a Category</p>
          <div className={styles.categoryWrapper}>
            <button
              className={`${styles.categoryBtn} ${category === "all" ? styles.activeCategory : ""}`}
              onClick={() => setCategory("all")}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat.slug}
                className={`${styles.categoryBtn} ${category === cat.slug ? styles.activeCategory : ""}`}
                onClick={() => {
                  if (category === cat.slug) {
                    setCategory("all");
                  } else {
                    setCategory(cat.slug);
                  }
                }}
              >
                {cat.name}
                {category === cat.slug && (
                  <span className={styles.closeIcon}> ×</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <input
          className={styles.search}
          placeholder="Search products..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className={styles.select}
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>

        <button className={styles.clearBtn} onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>

      {!isLoading && sortedProducts.length === 0 && (
        <div className={styles.empty}>
          <p>No products found 😕</p>
        </div>
      )}

      <div className={styles.grid}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : sortedProducts.map((product) => (

              // ← changed from Link to div so we can have both
              // Link (navigate) and button (add to cart) inside
              <div key={product.id} className={styles.card}>

                <Link href={`/products/${product.id}`}>
                  <Image
                    width={400}
                    height={400}
                    src={product.thumbnail}
                    alt={product.title}
                    className={styles.image}
                  />
                  <h3 className={styles.title}>{product.title}</h3>
                  <p className={styles.price}>From Rs. {product.price}</p>
                </Link>

              </div>
            ))}
      </div>

      <div ref={loadMoreRef}>
        {isFetchingNextPage && <p>Loading more Products..</p>}
      </div>

      {showTop && (
        <button className={styles.scrollTop} onClick={scrollToTop}>
          <Image src={srollup} alt="Scroll to top" width={40} height={40} />
        </button>
      )}
    </main>
  );
}