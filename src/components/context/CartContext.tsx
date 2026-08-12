import { createContext, useContext, useEffect, useState } from "react";

import type { Product } from "../../types/product";

interface CartItem extends Product {
  quantity: number;
  size?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  increaseQuantity: (id: number, size?: string) => void;
  decreaseQuantity: (id: number, size?: string) => void;
  removeFromCart: (id: number, size?: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const data = localStorage.getItem("cart");

    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, size?: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size,
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          size,
        },
      ];
    });
  };

  const increaseQuantity = (id: number, size?: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: number, size?: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id: number, size?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size)),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
