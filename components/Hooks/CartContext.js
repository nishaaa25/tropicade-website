"use client"
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    setCart((prev) => {
      // Check if same product (id+size+color) exists
      const idx = prev.findIndex(
        (i) =>
          i.id === item.id &&
          i.size === item.size &&
          i.color === item.color
      );
      if (idx > -1) {
        // Update quantity
        const updated = [...prev];
        updated[idx].qty += item.qty;
        return updated;
      }
      return [...prev, item];
    });
  }

  function removeFromCart(index) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  function updateQty(index, qty) {
    setCart((prev) => {
      const updated = [...prev];
      updated[index].qty = qty;
      return updated;
    });
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
} 