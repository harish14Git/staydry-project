import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

/* Create safe storage for Next.js App Router */
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

/* Now use storage AFTER it is declared */
const persistConfig = {
  key: "cart",
  storage,
};
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};

const persistedWishlistReducer = persistReducer(
  wishlistPersistConfig,
  wishlistReducer
);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;