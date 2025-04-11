"use client";

import React from 'react';
import BillingDetails from '../../components/common/BilingDetial';
import PlaceOrder from '../../components/common/placeOrder';
import PageHeader from "../../components/common/pageHeader";
import PageFooter from "../../components/common/pageFooter";

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
    <>
    <PageHeader title='checkout' />
      <div className="checkout-page  flex flex-row items-center justify-center">
      <BillingDetails onComplete={handleBillingComplete} />
    
    </div>
     <PageFooter />
    </>
  
  );
};

export default CheckoutPage;