"use client";

import React from 'react';
import BillingDetails from '../../components/common/BilingDetial';

interface BillingDetailsType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  saveInfo: boolean;
}

const CheckoutPage = () => {
  const handleBillingComplete = (details: BillingDetailsType) => {
    console.log('Billing details submitted:', details);
    // Proceed to next step (shipping/payment)
  };

  return (
    <div className="checkout-page">
      <BillingDetails onComplete={handleBillingComplete} />
    </div>
  );
};

export default CheckoutPage;