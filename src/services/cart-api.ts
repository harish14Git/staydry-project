export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

const CART_KEY = "my_cart";

// Get cart
export const getCart = async (): Promise<CartItem[]> => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

// Save cart
const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Add item
export const addToCart = async (item: CartItem) => {
  const cart = await getCart();

  const existing = cart.find(p => p.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
  return cart;
};

// Update quantity
export const updateQuantity = async (id: number, type: "inc" | "dec") => {
  const cart = await getCart();

  const item = cart.find(p => p.id === id);
  if (!item) return cart;

  if (type === "inc") item.quantity += 1;
  if (type === "dec") item.quantity -= 1;

  if (item.quantity <= 0) {
    return removeFromCart(id);
  }

  saveCart(cart);
  return cart;
};

// Remove item
export const removeFromCart = async (id: number) => {
  const cart = await getCart();
  const updated = cart.filter(item => item.id !== id);
  saveCart(updated);
  return updated;
};

// Clear cart
export const clearCartApi = async () => {
  localStorage.removeItem(CART_KEY);
  return [];
};