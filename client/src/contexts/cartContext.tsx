// cartContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  qty: number;
}

interface CartContextType {
  cartItems: Product[];
  addItem: (item: Omit<Product, 'qty'>) => void;
  removeItem: (id: number) => void;
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  
  // Initialize from localStorage
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    };
    
    loadCart();
    
    // Sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        loadCart();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const value = useMemo(() => {
    const findItem = (id: number) => cartItems.find(item => item.id === id);
    
    return {
      cartItems,
      totalItems: cartItems.reduce((sum, item) => sum + item.qty, 0),
      totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0),
      
      addItem: (item: Omit<Product, 'qty'>) => {
        setCartItems(prev => {
          const existing = findItem(item.id);
          return existing
            ? prev.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i)
            : [...prev, {...item, qty: 1}];
        });
      },
      
      removeItem: (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
      },
      
      incrementItem: (id: number) => {
        setCartItems(prev => 
          prev.map(item => 
            item.id === id ? {...item, qty: item.qty + 1} : item
          )
        );
      },
      
      decrementItem: (id: number) => {
        setCartItems(prev => 
          prev.map(item => 
            item.id === id 
              ? {...item, qty: Math.max(1, item.qty - 1)} 
              : item
          )
        );
      },
      
      clearCart: () => setCartItems([])
    };
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartState = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCartState must be used within CartProvider');
  return context.cartItems;
};

export const useCartActions = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCartActions must be used within CartProvider');
  return {
    handleAddItem: context.addItem,
    handleRemoveItem: context.removeItem,
    handleIncrement: context.incrementItem,
    handleDecrement: context.decrementItem,
    handleClearCart: context.clearCart
  };
};

export const useCartTotals = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCartTotals must be used within CartProvider');
  return {
    totalItems: context.totalItems,
    totalPrice: context.totalPrice
  };
};