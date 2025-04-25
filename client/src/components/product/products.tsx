"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { addCart } from "../../redux/action";
import styles from "./products.module.css";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const CTAButton: React.FC<{ text: string; productId?: number; onClick?: () => void }> = ({ text, productId, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    onClick?.();
    router.push(productId ? `/shop/${productId}` : "/shop");
  };

  return (
    <button className={styles.ctaButton} onClick={handleClick} aria-label={text}>
      {text}
      <span className={styles.ctaIcon} aria-hidden="true">→</span>
    </button>
  );
};

const Products: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      const products: Product[] = await response.json();
      setData(products);
      setFilter(products);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filterProduct = (category: string) => {
    const filtered = data.filter((item) => item.category === category);
    setFilter(filtered);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addCart(product));
  };

  const LoadingSkeleton = () => (
    <div className={styles.skeletonContainer}>
      {[...Array(6)].map((_, idx) => (
        <div className={styles.skeletonItem} key={idx}>
          <Skeleton height={592} />
        </div>
      ))}
    </div>
  );

  const FilterButtons = () => (
    <div className={styles.filterButtons}>
      {["All", "men's clothing", "women's clothing", "jewelery", "electronics"].map((cat) => (
        <button
          key={cat}
          className={styles.filterBtn}
          onClick={() => cat === "All" ? setFilter(data) : filterProduct(cat)}
        >
          {cat === "All" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );

  const ProductList = () => (
    <div className={styles.productsGrid}>
      {filter.map((product) => (

        <div key={product.id} className={styles.card}>
          <Image src={product.image} alt={product.title} width={300} height={300} className={styles.productImage} />
          <div className={styles.cardBody}>
            <h5 className={styles.productTitle}>{product.title.slice(0, 12)}...</h5>
            <p className={styles.productDesc}>{product.description.slice(0, 90)}...</p>
            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>

            <div className={styles.buttonGroup}>
              <CTAButton text="Buy Now" productId={product.id} />
              <CTAButton text="Add to Cart"  onClick={() => handleAddToCart(product)} />
            </div>

          </div>
        </div>
        
      ))}
    </div>
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Latest Products</h2>
      <hr />
      <FilterButtons />
      {loading ? <LoadingSkeleton /> : <ProductList />}
    </div>
  );
};

export default Products;
