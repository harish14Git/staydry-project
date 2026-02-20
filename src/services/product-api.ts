import { Category} from "@/src/types/product-types"
// fetch, search, catogory filter and paginated products
export const fetchProducts = async (page: number, limit: number,search:string,category:string) => {
  const skip = (page - 1) * limit;

  let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

  //search
  if(search){
    url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
  }
   //Category filter
  if (category && category !== "all") {
    url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

// fetch single product
export const fetchProductById = async (id: string) => {
  const res = await fetch(
    `https://dummyjson.com/products/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
};
//fetchCategories
export const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch("https://dummyjson.com/products/categories");

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};



