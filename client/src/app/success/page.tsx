'use client';

import { Suspense } from 'react';
import PageHeader from "@/components/common/pageHeader";
import PageFooter from "@/components/common/pageFooter";
import Style from "./style.module.css";

import SuccessContent from './success-content';

const SuccessPage = () => {
  return (
    <>
      <PageHeader title="success" />

      <Suspense fallback={<div className={Style.loading}><div className={Style.spinner}></div>Loading...</div>}>
        <SuccessContent />
      </Suspense>

      <PageFooter />
    </>
  );
};

export default SuccessPage;
