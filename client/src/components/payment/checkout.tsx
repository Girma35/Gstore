"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import styles from "./checkoutPage.module.css";
import { ShoppingBag, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import PlaceOrder from "@/components/common/placeOrder";
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: { rate: number; count: number };
  qty: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = () => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state.handleCart);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadCart = () => {
      try {
        const existingCart = localStorage.getItem("cart");
        const cart: Product[] = existingCart ? JSON.parse(existingCart) : [];
        
        if (!Array.isArray(cart)) throw new Error("Invalid cart data format");

        const mappedCart: CartItem[] = cart.map(item => ({
          id: item.id,
          name: item.title,
          price: Number(item.price),
          quantity: Math.max(1, Math.min(99, Number(item.qty))),
          image: item.image
        }));

        setCartItems(mappedCart);
        setError(null);
      } catch (err) {
        console.error("Error loading cart:", err);
        setError("Failed to load your cart. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [state]);

  const handleCheckout = async () => {
    setIsProcessing(true);
    setError(null);
    setSuccess(null);
    
    try {
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error("Payment system unavailable. Please try again later.");
      }
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: cartItems,
          customerEmail: "user@example.com"
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const result = await stripe?.redirectToCheckout({ sessionId });

      if (result?.error) {
        throw result.error;
      }

      setSuccess("Redirecting to payment...");
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingPrice = totalPrice > 100 ? 0 : 15;
  const taxPrice = totalPrice * 0.1;
  const grandTotal = totalPrice + shippingPrice + taxPrice;

  return (
    <section className={styles.checkoutSection}>
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutGrid}>
          {/* Order Summary Column */}
          <div className={styles.orderColumn}>
            <div className={styles.orderCard}>
              <div className={styles.cardHeader}>
                <ShoppingBag className={styles.cardIcon} />
                <h2 className={styles.cardTitle}>Order Summary</h2>
              </div>
              
              {isLoading ? (
                <div className={styles.loadingState}>
                  <Loader2 className={styles.spinner} />
                  <span>Loading your order...</span>
                </div>
              ) : error ? (
                <div className={styles.errorState}>
                  <AlertCircle className={styles.alertIcon} />
                  <div className={styles.errorMessage}>{error}</div>
                  <button 
                    onClick={() => window.location.reload()}
                    className={styles.retryButton}
                  >
                    Try Again
                  </button>
                </div>
              ) : cartItems.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyMessage}>Your cart is empty</div>
                  <Link href="/products" className={styles.shopButton}>
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <>
                  <PlaceOrder 
                    cartItems={cartItems} 
                    totalPrice={totalPrice} 
                  />
                  
                  <div className={styles.pricingSummary}>
                    <div className={styles.pricingRow}>
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className={styles.pricingRow}>
                      <span>Shipping</span>
                      <span>{shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}</span>
                    </div>
                    <div className={styles.pricingRow}>
                      <span>Tax (10%)</span>
                      <span>${taxPrice.toFixed(2)}</span>
                    </div>
                    <div className={styles.totalRow}>
                      <span>Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {success && (
                    <div className={styles.successState}>
                      <CheckCircle className={styles.successIcon} />
                      <span>{success}</span>
                    </div>
                  )}

                  <button 
                    onClick={handleCheckout}
                    disabled={isProcessing || cartItems.length === 0}
                    className={styles.checkoutButton}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className={styles.buttonSpinner} />
                        Processing Payment...
                      </>
                    ) : (
                      'Secure Checkout'
                    )}
                  </button>

                  <div className={styles.securityNote}>
                    <svg className={styles.lockIcon} viewBox="0 0 24 24">
                      <path d="M12 1C8.676 1 6 3.676 6 7v1H4v14h16V8h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v1H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
                    </svg>
                    <span>All transactions are secure and encrypted</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;