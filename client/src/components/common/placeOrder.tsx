import React, { useState } from 'react';
import styles from './placeOrder.module.css';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface PlaceOrderProps {
  cartItems: CartItem[];
  totalPrice: number;
}

const PlaceOrder: React.FC<PlaceOrderProps> = ({ cartItems, totalPrice }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('credit-card');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      console.log('Order placed:', { cartItems, totalPrice, paymentMethod });
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className={styles.orderSuccess}>
        <h2>🎉 Order Placed Successfully!</h2>
        <p>Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <div className={styles.placeOrder}>
      <h2>Place Your Order</h2>
      
      <div className={styles.orderSummary}>
        <h3>Order Summary</h3>
        <ul className={styles.itemsList}>
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>{item.quantity} × ${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className={styles.total}>
          Total: <strong>${totalPrice.toFixed(2)}</strong>
        </p>
      </div>

      <div className={styles.paymentMethod}>
        <h3>Payment Method</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className={styles.paymentSelect}
        >
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank-transfer">Bank Transfer</option>
        </select>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={isProcessing || cartItems.length === 0}
        className={styles.placeOrderBtn}
      >
        {isProcessing ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
};

export default PlaceOrder;