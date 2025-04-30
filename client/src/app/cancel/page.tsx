'use client';

import React, { Suspense } from 'react';
import CancelPageContent from './CancelPageContent';

const CancelPage = () => {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <CancelPageContent />
    </Suspense>
  );
};

export default CancelPage;
