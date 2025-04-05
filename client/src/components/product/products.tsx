"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { addCart } from "../../redux/action/index";
import styles from '../hero/hero.module.css';
import { useRouter } from "next/navigation";


import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}


const CTAButton = ({ 
  text, 
  productId,
  onClick 
}: { 
  text: string; 
  productId?: number; 
  onClick?: () => void 
}) => {
  const router = useRouter();

  const handleClick = () => {
    console.log("Button clicked!");
    if (onClick) onClick();
    if (productId) {
      router.push(`/shop/${productId}`); 
    } else {
      router.push("/shop"); 
    }
  };

  return (
    <button 
      onClick={handleClick} 
      className={styles.ctaButton}
      aria-label={text}
    >
      {text}
      <span className={styles.ctaIcon} aria-hidden="true">→</span>
    </button>
  );
};


const Products: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Product[]>(data);
  const [loading, setLoading] = useState<boolean>(false);
  let componentMounted: boolean = true;

  const dispatch = useDispatch();

  const addProduct = (product: Product): void => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted) {
        const fetchedData: Product[] = await response.clone().json();
        setData(fetchedData);
        setFilter(fetchedData);
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading: React.FC = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat: string): void => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts: React.FC = () => {
    return (
      <>

      {/* // catogory filter buttons */}

      <div className="buttons text-center py-5">
  <button
    className="btn btn-outline-dark btn-sm m-2 px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
    onClick={() => setFilter(data)}
  >
    All
  </button>
  <button
    className="btn btn-outline-dark btn-sm m-2 px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
    onClick={() => filterProduct("men's clothing")}
  >
    Men's Clothing
  </button>
  <button
    className="btn btn-outline-dark btn-sm m-2 px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
    onClick={() => filterProduct("women's clothing")}
  >
    Women's Clothing
  </button>
  <button
    className="btn btn-outline-dark btn-sm m-2 px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
    onClick={() => filterProduct("jewelery")}
  >
    Jewelry
  </button>
  <button
    className="btn btn-outline-dark btn-sm m-2 px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
    onClick={() => filterProduct("electronics")}
  >
    Electronics
  </button>
</div>



 {/* product cards */}

 <div className="flex flex-wrap justify-content-center gap-4 mx-auto">
  {filter.map((product) => {
    return (
        <div
        id={String(product.id)}
        key={product.id}
        className="col mb-4"
      >
        <div className="card text-center shadow-sm h-100">
  <Image
    className="card-img-top p-3"
    src={product.image}
    alt={product.title}
    height={300}
    width={300}
  />
  <div className="card-body">
    <h5 className="card-title text-uppercase font-weight-bold mb-2">
      {product.title.substring(0, 12)}...
    </h5>
    <p className="card-text text-muted mb-3" style={{ fontSize: '0.9rem' }}>
      {product.description.substring(0, 90)}...
    </p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item text-center font-weight-bold" style={{ fontSize: '1.2rem' }}>
      <span className="text-success">$ {product.price}</span>
    </li>
  </ul>
  <div className="card-body d-flex justify-content-between">
  <CTAButton text="Buy Now"  productId={product.id} />
    <CTAButton text="Add to Cart"  productId={product.id} />
    
  </div>
</div>



      </div>
    );
  })}
</div>
 


      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
