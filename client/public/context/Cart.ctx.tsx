"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ✅ Define TypeScript types for Cart Items
type CartItem = {
  itemName: string;
  price: number;
  code: "LT" | "ULT" | "HF" | "FL" | "SL"; // 🔥 Item category
  quantity: number; // ✅ Added quantity
  img:string
};

// ✅ Define Context Type
type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemName: string, code: "LT" | "ULT" | "HF" | "FL" | "SL") => void;
  updateQuantity: (itemName: string, quantity: number,code: "LT" | "ULT" | "HF" | "FL" | "SL") => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
};

// ✅ Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// ✅ Create the provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ Load cart from local storage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // ✅ Save cart to local storage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Add item to cart (increase quantity if already in cart)
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.itemName === item.itemName && i.code === item.code);
      if (existingItem) {
        return prev.map((i) =>
          i.itemName === item.itemName ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // ✅ Remove item from cart by `itemName`
  const removeFromCart = (itemName: string, code: "LT" | "ULT" | "HF" | "FL" | "SL") => {
    setCart((prev) => prev.filter((item) => !(item.itemName === itemName && item.code === code)));
  };

  // ✅ Update quantity of an item
  const updateQuantity = (itemName: string, quantity: number, code: "LT" | "ULT" | "HF" | "FL" | "SL") => {
    setCart((prev) =>
      prev.map((item) =>
        (item.itemName === itemName && item.code === code)
          ? { ...item, quantity: Math.max(quantity, 1) } // 👈 Ensures quantity is always ≥ 0
          : item
      )
    );
  };

  // ✅ Clear entire cart (also clears local storage)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // ✅ Calculate total price dynamically
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // ✅ Get total item count
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartItemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook to use Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
