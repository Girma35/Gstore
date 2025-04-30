"use client";

import React, { useEffect, useState, useRef } from "react";
import style from "./nav.module.css";
import Link from "next/link";
import Image from "next/image"; // Import Image from next/image

import "@fortawesome/fontawesome-free/css/all.min.css";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  qty: number;
}

const Header = () => {


  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        const cart = e.newValue ? JSON.parse(e.newValue) : [];
        setCartItems(cart);
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  useEffect(() => {
    const syncCart = () => {
      const existingCart = localStorage.getItem("cart");
      const cart = existingCart ? JSON.parse(existingCart) : [];
      setCartItems(cart);
    };
  
    syncCart();
  
    
    const interval = setInterval(syncCart, 1000);
    return () => clearInterval(interval);
  }, []);
  const EmptyCart = () => (
    <div className="flex items-center justify-center min-h-[200px] p-6 bg-gray-50 rounded-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">🛒 Your Cart is Empty</h2>
        <p className="text-gray-500 mb-4">Looks like you haven&apos;t added anything to your cart yet.</p> {/* Escaped the single quote */}
        <Link 
          href="/" 
          className={style.addToCart}
        >
          <i className="fa fa-arrow-left mr-2"></i>Continue Shopping
        </Link>
      </div>
    </div>
  );

  const handleAddToCart = (item: Product) => {
    const found = cartItems.find((p) => p.id === item.id);
    let updatedCart = [...cartItems];
  
    if (!found) {
      const newItem = {
        ...item,
        qty: 1,
        price: isNaN(item.price) ? 1 : item.price,
        rating: {
          rate: isNaN(item.rating?.rate) ? 1 : item.rating.rate,
          count: isNaN(item.rating?.count) ? 1 : item.rating.count,
        },
      };
      updatedCart.push(newItem);
    } else {
      updatedCart = updatedCart.map((p) =>
        p.id === item.id ? { ...p, qty: p.qty + 1 } : p
      );
    }
  
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (id: number) => {
    let updatedCart = cartItems.filter((p) => p.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id: number, newQty: number) => {
    if (newQty < 1) return;
    
    let updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, qty: newQty } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2);
  };

  const [activeSearch, setActiveSearch] = useState(false);
  const [activeCart, setActiveCart] = useState(false);
  const [activeLogin, setActiveLogin] = useState(false);
  const [activeNavbar, setActiveNavbar] = useState(false);
  
  const searchFormRef = useRef<HTMLFormElement>(null);
  const shoppingCartRef = useRef<HTMLDivElement>(null);
  const loginFormRef = useRef<HTMLFormElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const toggleSearchForm = () => {
    setActiveSearch((prev) => !prev);
    setActiveCart(false);
    setActiveLogin(false);
    setActiveNavbar(false);
  };

  const toggleShoppingCart = () => {
    setActiveCart((prev) => !prev);
    setActiveSearch(false);
    setActiveLogin(false);
    setActiveNavbar(false);
  };

  const toggleLoginForm = () => {
    setActiveLogin((prev) => !prev);
    setActiveSearch(false);
    setActiveCart(false);
    setActiveNavbar(false);
  };

  const toggleNavbar = () => {
    setActiveNavbar((prev) => !prev);
    setActiveSearch(false);
    setActiveCart(false);
    setActiveLogin(false);
  };

  return (
    <header className={style.header}>
      <Link href="/" className={style.logo}>
        <i className="fas fa-shopping-basket"></i> Gstore
      </Link>

      <nav className={`${style.navbar} ${activeNavbar ? style.active : ''}`} ref={navbarRef}>
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <div className={style.icons}>
        <div className="fas fa-bars" id={style.menu_btn} onClick={toggleNavbar}></div>
        <div className="fas fa-search" id={style.search_btn} onClick={toggleSearchForm}></div>
        <div className="fas fa-shopping-cart" id={style.cart_btn} onClick={toggleShoppingCart}>
          {cartItems.length > 0 && (
            <span className={style.cart_count}>{cartItems.reduce((total, item) => total + item.qty, 0)}</span>
          )}
        </div>
        <div className="fas fa-user" id={style.login_btn} onClick={toggleLoginForm}></div>
      </div>

      <form
        action=""
        className={`${style.search_form} ${activeSearch ? style.active : ''}`}
        ref={searchFormRef}
      >
        <input type="search" id={style.search_box} placeholder="Search here..." />
        <label htmlFor="search_box" className="fas fa-search"></label>
      </form>

      <div className={`${style.shopping_cart} ${activeCart ? style.active : ''}`} ref={shoppingCartRef}>
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {cartItems.map((item) => (
              <div className={style.box} key={item.id}>
                <i className="fas fa-trash" onClick={() => handleRemoveFromCart(item.id)}></i>
                {/* Replaced <img> with <Image> component */}
                <Image src={item.image} alt={item.title} width={150} height={150} />
                <div className={style.content}>
                  <h3>{item.title}</h3>
                  <span className={style.price}>${item.price.toFixed(2)}/-</span>
                  <div className={style.quantity_control}>
                    <button onClick={() => updateQuantity(item.id, item.qty - 1)}>-</button>
                    <span className={style.quantity}>qty: {item.qty}</span>
                    <button onClick={() => updateQuantity(item.id, item.qty + 1)}>+</button>
                  </div>
                </div>
              </div>
            ))}

            <div className={style.cartActions}>
  <div className={style.total}>
    <span className={style.totalLabel}>Total:</span>
    <span className={style.totalAmount}>${calculateTotal()}</span>
  </div>
  
  <div className={style.actionButtons}>
    <Link 
      href="/cart" 
      className={`${style.cartButton} ${style.secondaryButton}`}
      aria-label="View cart details"
    >
      <i className="fas fa-shopping-cart mr-2"></i>
      View Cart
    </Link>
    
    <Link 
      href="/checkout" 
      className={`${style.cartButton} ${style.primaryButton}`}
      aria-label="Proceed to checkout"
    >
      <i className="fas fa-credit-card mr-2"></i>
      Checkout
    </Link>
  </div>
</div>
          </>
        )}
      </div>

      <form
        action=""
        className={`${style.login_form} ${activeLogin ? style.active : ''}`}
        ref={loginFormRef}
      >
        
         <Link href="./auth" className={style.addToCart}>
        <button>Login now</button>
        </Link>
      
        <input type="email" placeholder="your email" className={style.box} />
        <input type="password" placeholder="your password" className={style.box} />
        <p>
          forget your password 
          <Link href="./auth" className={style.addToCart}>
        <button>Click Here</button>
        </Link>
        </p>
  
        <p>
        don&apos;t have an account {/* Escaped the single quote */}
         <Link href="./auth" className={style.addToCart}>
        <button>create now</button>
        </Link>
        </p>

        <input type="submit" value="login now" className={style.btn} />
      </form>
    </header>
  );
};

export default Header;
