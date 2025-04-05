"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams(); // get dynamic route param
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
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <span className="text-xl font-semibold text-green-600">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
