import React from 'react';

const FooterSection = () => {
  return (
    <div className="flex flex-row items-center justify-center bg-[#FAF4F4] py-8 space-x-8">
      {/* Free Delivery Section */}
      <div className="relative w-full max-w-[480px] h-[316px] overflow-hidden flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold text-[#000000] drop-shadow-lg z-10 text-center px-4">
          Free Delivery
        </h1>
        <p className="text-lg text-[#9F9F9F] drop-shadow-lg z-10 text-center px-4 mt-4">
          For all orders over $50, enjoy free delivery.
        </p>
      </div>

      {/* 90 Days Return Section */}
      <div className="relative w-full max-w-[480px] h-[316px] overflow-hidden flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold text-[#000000] drop-shadow-lg z-10 text-center px-4">
          90 Days Return
        </h1>
        <p className="text-lg text-[#9F9F9F] drop-shadow-lg z-10 text-center px-4 mt-4">
          If the product has issues, return it within 90 days for a full refund.
        </p>
      </div>

      {/* Secure Payment Section */}
      <div className="relative w-full max-w-[480px] h-[316px] overflow-hidden flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold text-[#000000] drop-shadow-lg z-10 text-center px-4">
          Secure Payment
        </h1>
        <p className="text-lg text-[#9F9F9F] drop-shadow-lg z-10 text-center px-4 mt-4">
          100% secure payment processing, ensuring your privacy and security.
        </p>
      </div>
    </div>
  );
};

export default FooterSection;
