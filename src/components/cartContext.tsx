import React, { ReactNode, useState, useEffect } from "react";

interface cart_data {
  id: number;
  imageSRC: string;
  title: string;
  price: string;
  quantity: number;
}

export const cartContext = React.createContext<any>(null);

export default function CartContext({ children }: { children: ReactNode }) {
  const savedCart = localStorage.getItem("cart");
  const initalCart = savedCart ? JSON.parse(savedCart) : [];
  const [cart, setCart] = useState<cart_data[]>(initalCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: cart_data) => {
    console.log("addToCart llamado con:", item);
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
  };

  const addOneToCart = (item: cart_data) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        let quantity = updated[existingIndex].quantity;
        console.log(quantity);
        updated[existingIndex].quantity += 1;
        if (quantity + 1 !== updated[existingIndex].quantity) {
          updated[existingIndex].quantity -= 1;
        }
        return updated;
      }
      return [...prev, item];
    });
  };

  const removeToCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const changeQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeToCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        addToCart,
        addOneToCart,
        removeToCart,
        changeQuantity,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
