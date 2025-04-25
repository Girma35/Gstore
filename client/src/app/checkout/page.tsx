"use client";

import React, { ReactNode, useEffect, useState } from "react";
import PageHeader from "@/components/common/pageHeader";
import PageFooter from "@/components/common/pageFooter";
import Checkout from "@/components/payment/checkout";

const CheckoutPage = () => {
  

  return (
    <div >
      <PageHeader title="Checkout" />

      <Checkout />
      
      <PageFooter />
    </div>
  );
};

export default CheckoutPage;