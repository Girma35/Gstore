"use client";

import React, { useEffect, useState } from "react";
import PageFooter from "@/components/common/pageFooter";
import PageHeader from "@/components/common/pageHeader";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductDetail.module.css";
import {useCartActions} from "@/contexts/cartContext";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetail: React.FC = () => {
  const { handleAddItem} = useCartActions();

  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);



  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data: Product = await res.json();
      setProduct(data);
      setLoading(false);
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading || !product) return <div className="text-center my-10">Loading...</div>;

  return (
    <>
      <PageHeader title={product.title} />
      
      <div className={styles.container}>

        <div className={styles.detailWrapper}>
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className={styles.productImage}
          />
          
        </div>

        <div >
      <div className={styles.detailContent}>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.description}>{product.description}</p>
            <div className={styles.price}>${product.price}</div>
            <Link href="/cart">
              
                <button
                   onClick={() => handleAddItem(product)}
                  className={styles.addToCart}
                >
                  Add to Cart
                </button>
            </Link>
            <div className={styles.ratingWrapper}>
              <div className={styles.stars}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>
                    {i < Math.round(product.rating.rate) ? "★" : "☆"}
                  </span>
                ))}
                <span className={styles.reviewCount}>
                  ({product.rating.count} reviews)
                </span>
              </div>
              <p className={styles.averageRating}>
                Average Rating: {product.rating.rate}/5
              </p>
            </div>
            <p className={styles.category}>
              Category: <span className={styles.categoryText}>{product.category}</span>
            </p>
          </div>
      </div>

      </div>
      <PageFooter />
    </>
  );
};

export default ProductDetail;
