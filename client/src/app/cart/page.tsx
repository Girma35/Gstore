"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import PageHeader from "../../components/common/pageHeader";
import PageFooter from "../../components/common/pageFooter";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import styles from "./cart.module.css";

// Define the Product type
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: ReactNode;
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
  
  // State to manage the cart
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Update the cartItems state based on localStorage
  useEffect(() => {
    const existingCart = localStorage.getItem("cart");
    const cart: Product[] = existingCart ? JSON.parse(existingCart) : [];
    setCartItems(cart);
  }, []);

  const EmptyCart = () => (
    <div className={styles.emptyCartContainer}>
      <div className={styles.emptyCartContent}>
        <h2 className={styles.emptyCartTitle}>🛒 Your Cart is Empty</h2>
        <p className={styles.emptyCartText}>Looks like you haven’t added anything to your cart yet.</p>
        <Link href="/" className={styles.continueShoppingBtn}>
          <i className="fa fa-arrow-left me-2"></i>Continue Shopping
        </Link>
      </div>
    </div>
  );

  const handleAddToCart = (item: Product) => {
    const found = cartItems.find((p) => p.id === item.id);
    let updatedCart = [...cartItems];

    if (!found) {
      const newItem = { ...item, qty: 1 };
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
    const headerText = [
      "Product",
      "Price",
      "Quantity",
      "Subtotal"
    ];

    let subtotal: number = 0;
    let shipping: number = 30.0;
    let totalItems = 0;

    cartItems.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <>
        <section className={styles.cartSection}>
          <div className={styles.leftSection}>
            <div className={styles.cartHeader}>
              {headerText.map((text, index) => (
                <div key={index} className={styles.cartItems}>
                  {text}
                </div>
              ))}
            </div>

            <div className={styles.cartItems}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div>
                    <div>
                      {item.image}
                    </div>
                  </div>

                  <div>
                    <p><strong>{item.title}</strong></p>
                  </div>

                  <div>
                    <div className={styles.quantityControls}>
                      <button
                        onClick={() => handleRemoveFromCart(item)}
                        className={styles.quantityButton}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <p className={styles.itemQty}>{item.qty}</p>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className={styles.quantityButton}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className={styles.itemPrice}>
                      <strong>
                        <span className={styles.qtyLabel}>{item.qty}</span> x ${item.price}
                      </strong>
                    </p>
                  </div>

                  <hr className="my-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className={styles.card}>
            <div className="card mb-4">
              <div className={styles.orderSummaryHeader}>
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products ({totalItems})<span>${Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping<span>${shipping}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div><strong>Total amount</strong></div>
                    <span><strong>${Math.round(subtotal + shipping)}</strong></span>
                  </li>
                </ul>
                <button className={styles.ctaButton}>
                  <Link href="/checkout" className="btn btn-dark btn-lg btn-block">
                    Go to Checkout
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
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
