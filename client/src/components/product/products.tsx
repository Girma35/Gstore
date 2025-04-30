"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useCartActions } from "@/contexts/cartContext";
import styles from "./products.module.css";
import toast, { Toaster } from "react-hot-toast";
import { MdDescription } from "react-icons/md";


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const CTAButton: React.FC<{ 
  text: string; 
  productId?: number; 
  onClick?: () => void;
  disabled?: boolean;
}> = ({ text, productId, onClick, disabled = false }) => {
  const router = useRouter();

  const handleClick = () => {
    onClick?.();
    if (productId) {
      router.push(`/shop/${productId}`);
    }
  };

  return (
    <button 
      className={styles.ctaButton} 
      onClick={handleClick} 
      aria-label={text}
      disabled={disabled}
    >
      {text}
      <span className={styles.ctaIcon} aria-hidden="true">→</span>
    </button>
  );
};

const Products: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const { handleAddItem } = useCartActions();

  const filteredProducts = useMemo(() => {
    return activeFilter === "All" 
      ? data 
      : data.filter(item => item.category === activeFilter);
  }, [data, activeFilter]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        const products: Product[] = await response.json();
        setData(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  // Handle To Cart Button 

  const handleAddToCart = async (product: Product) => {
    console.log("Add to cart clicked:", product);

    try {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category,
        qty: 1,
      };
  
      await handleAddItem(cartItem);
      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      setAddingToCart(null);
    }
  };
  

  const LoadingSkeleton = () => (
    <div className={styles.productsGrid}>
      {[...Array(6)].map((_, idx) => (
        <div className={styles.card} key={idx}>
          <Skeleton height={200} />
          <div className={styles.cardBody}>
            <Skeleton count={3} />
          </div>
        </div>
      ))}
    </div>
  );

  const FilterButtons = () => (
    <div className={styles.filterButtons}>
      {["All", "men's clothing", "women's clothing", "jewelery", "electronics"].map((cat) => (
        <button
          key={cat}
          className={`${styles.filterBtn} ${
            activeFilter === cat ? styles.activeFilter : ''
          }`}
          onClick={() => setActiveFilter(cat)}
        >
          {cat === "All" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );

  const ProductList = () => (
    <div className={styles.productsGrid}>
      {filteredProducts.map((product, idx) => (
        <div key={product.id} className={styles.card}>
          <div className={styles.imageContainer}>
            <Image 
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              className={styles.productImage}
              priority={idx < 3}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-product.png';
              }}
            />
          </div>
          <div className={styles.cardBody}>
            <h5 className={styles.productTitle}>{product.title}</h5>
            <p className={styles.productDesc}>
              {product.description.slice(0, 90)}...
            </p>
            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>

            <div className={styles.buttonGroup}>

              {/* Buy Now Button  */}

              <CTAButton text="Buy Now" productId={product.id} />
              {/* Add To Cart Button  */}


              <button 
                className={styles.ctaButton}
                onClick={() => {
                  console.log("Clicked add to cart");
                  handleAddToCart(product)}}
              >
                {addingToCart === product.id ? 'Adding...' : 'Add to Cart'}
              </button>


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