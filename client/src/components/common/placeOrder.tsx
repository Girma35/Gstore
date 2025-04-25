import React, { useState } from 'react';
import styles from './placeOrder.module.css';
import { loadStripe } from '@stripe/stripe-js';
import Image from "next/image";
import { FiCreditCard, FiShoppingBag, FiAlertCircle, FiLoader } from 'react-icons/fi';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface PlaceOrderProps {
  cartItems: CartItem[];
  totalPrice: number;
}

const PlaceOrder: React.FC<PlaceOrderProps> = ({ cartItems, totalPrice }) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51RCpyzPxL2CcxtRwP8hNLhTzyBLjlFmPGUsc30OOc2djkqKDoEx1F4FX0XagyZh99Xq42ZnjYangkPhMljCsIKKb00Hl2QIOvD');

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Payment service unavailable');
      }

      const response = await fetch(`${baseUrl}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: cartItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment processing failed');
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Payment gateway error');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setIsProcessing(false);
    }
  };

  const shippingFee = totalPrice > 100 ? 0 : 15;
  const tax = totalPrice * 0.1;
  const grandTotal = totalPrice + shippingFee + tax;

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <FiShoppingBag className={styles.headerIcon} />
        <h2 className={styles.title}>Complete Your Purchase</h2>
      </div>

      <div className={styles.testCardNote}>
        <FiCreditCard className={styles.cardIcon} />
        <span>Test card: <strong>4242 4242 4242 4242</strong> with any future date</span>
      </div>

      <div className={styles.orderSummary}>
        <h3 className={styles.summaryTitle}>Order Details</h3>
        
        <ul className={styles.itemsList}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <div className={styles.itemImageContainer}>
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  width={400} 
                  height={400}
                  className={styles.itemImage}
                  objectFit="cover"
                />
              </div>
              <div className={styles.itemDetails}>
                <span className={styles.itemName}>{item.name}</span>
                <div className={styles.itemMeta}>
                  <span className={styles.itemQuantity}>Qty: {item.quantity}</span>
                  <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.priceBreakdown}>
          <div className={styles.priceRow}>
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.priceRow}>
            <span>Shipping</span>
            <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
          </div>
          <div className={styles.priceRow}>
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.grandTotal}>${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <FiAlertCircle className={styles.errorIcon} />
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={handlePlaceOrder}
        disabled={isProcessing || cartItems.length === 0}
        className={styles.placeOrderButton}
      >
        {isProcessing ? (
          <>
            <FiLoader className={styles.spinner} />
            Processing Payment...
          </>
        ) : (
          'Secure Checkout'
        )}
      </button>

      <div className={styles.securityBadge}>
        <div className={styles.lockIcon}>
          <svg viewBox="0 0 24 24">
            <path d="M12 1C8.676 1 6 3.676 6 7v1H4v14h16V8h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v1H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
          </svg>
        </div>
        <span>256-bit SSL secured checkout</span>
      </div>

    </div>
  );
};

export default PlaceOrder;