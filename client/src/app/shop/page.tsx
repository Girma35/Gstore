import React from 'react';
import PageHeader from "../../components/common/pageHeader";
import PageFooter from "../../components/common/pageFooter";
import Product from "../../components/product/products";



export default function Shop() {
  return (
    <>
    <PageHeader title="shop" />

    <div className=" container my-3 py-3">
      <div className="row">
    
      </div>
      <div className="row justify-content-center">
        <Product />
      </div>
    </div>

<PageFooter />
    </>
  );
}


