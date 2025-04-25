"use client";

import React, { useEffect, useState } from 'react';
import PageHeader from "@/components/common/pageHeader";
import PageFooter from "@/components/common/pageFooter";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import styles from "./cart.module.css";
import Image from "next/image";

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

const Cart = () => {
  const state = useSelector((state: RootState) => state.handleCart);
  const dispatch: AppDispatch = useDispatch();
  
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const existingCart = localStorage.getItem("cart");
    let cart: Product[] = existingCart ? JSON.parse(existingCart) : [];

    cart = cart.map((item) => ({
      ...item,
      qty: isNaN(item.qty) || item.qty < 1 ? 1 : item.qty,
      price: isNaN(item.price) ? 1 : item.price,
      rating: {
        rate: isNaN(item.rating?.rate) ? 1 : item.rating.rate,
        count: isNaN(item.rating?.count) ? 1 : item.rating.count,
      },
    }));

    setCartItems(cart);
  }, []);

  const EmptyCart = () => (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyContent}>
        <h2 className={styles.emptyTitle}>🛒 Your Cart is Empty</h2>
        <p className={styles.emptyText}>Looks like you haven&apos;t added anything to your cart yet.</p>
        <Link href="/" className={styles.continueButton}>
          <i className="fa fa-arrow-left me-2"></i>Continue Shopping
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

  const handleRemoveFromCart = (item: Product) => {
    let updatedCart = cartItems.filter((p) => p.id !== item.id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const ShowCart = () => {
    const headerText = ["Product", "Price", "Quantity", "Subtotal"];

    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    cartItems.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.header}>
            {headerText.map((text, index) => (
              <div key={index} className={styles.headerItem}>
                {text}
              </div>
            ))}
          </div>

          <div className={styles.itemsList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  width={100} 
                  height={100}
                  className={styles.itemImage}
                  priority={true}
                />

                <div className={styles.itemTitle}>
                  <p><strong>{item.title}</strong></p>
                </div>

                <div className={styles.quantityControls}>
                  <button
                    onClick={() => handleRemoveFromCart(item)}
                    className={styles.quantityButton}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <p className={styles.quantityDisplay}>{item.qty}</p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={styles.quantityButton}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>

                <div className={styles.itemPrice}>
                  <strong>${(item.price * item.qty).toFixed(2)}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryHeader}>
            <h5>Order Summary</h5>
          </div>
          <div className={styles.summaryList}>
            <ul className={styles.listGroup}>
              <li className={styles.listItem}>
                <span>Products ({totalItems})</span>
                <span>${subtotal.toFixed(2)}</span>
              </li>
              <li className={styles.listItem}>
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </li>
              <li className={`${styles.listItem} ${styles.totalAmount}`}>
                <div><strong>Total amount</strong></div>
                <span><strong>${(subtotal + shipping).toFixed(2)}</strong></span>
              </li>
            </ul>

            <div className={styles.addToCart}>
              <Link href="/checkout">
                Go to Checkout
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <PageHeader title="Cart" />
      {cartItems.length === 0 ? <EmptyCart /> : <ShowCart />}
      <PageFooter />
    </>
  );
};

export default Cart;