"use client";

import React, { useEffect } from 'react';
import PageHeader from "@/components/common/pageHeader";
import PageFooter from "@/components/common/pageFooter";
import Link from "next/link";
import styles from "./cart.module.css";
import Image from "next/image";
import { useCartState, useCartActions } from '@/contexts/cartContext';

const Cart = () => {
 

  const cartItems = useCartState();


  const {
    handleAddItem,
    handleIncrement,
    handleDecrement
  } = useCartActions();

  // Sync with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const existingCart = localStorage.getItem("cart");
      if (existingCart) {
        const parsedCart = JSON.parse(existingCart);
        parsedCart.forEach((item: any) => handleAddItem(item));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);




  // debugging 

  const handleClick = () => {
    console.log('Cart items:', cartItems);
  };

  const EmptyCart = () => (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyContent}>
        <h2 className={styles.emptyTitle}>🛒 Your Cart is Empty</h2>
        <p className={styles.emptyText}>Looks like you haven&apos;t added anything to your cart yet.</p>

        <button
           onClick={handleClick}
        >
        <Link href="/" className={styles.continueButton} 
     >
        
          <i className="fa fa-arrow-left me-2"></i>Continue Shopping
        </Link>
        </button>
        
      </div>
    </div>
  );

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
                    onClick={() => handleDecrement(item.id)}
                    className={styles.quantityButton}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <p className={styles.quantityDisplay}>{item.qty}</p>
                  <button
                    onClick={() => handleIncrement(item.id)}
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