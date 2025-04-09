"use client";

import React, { useEffect, useState } from "react";
import PageFooter from "../../../components/common/pageFooter";
import PageHeader from "../../../components/common/pageHeader";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleAddToCart = (item: Product) => {
    // Define a type that includes quantity
    type CartItem = Product & { quantity: number };
  
    // Get existing cart from localStorage
    const existingCart = localStorage.getItem("cart");
    const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];
  
    // Check if the item already exists in the cart
    const found = cart.find((p) => p.id === item.id);
  
    if (!found) {
      // If not found, add item with quantity 1
      const newItem: CartItem = { ...item, quantity: 1 };
      cart.push(newItem);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      // If found, update quantity
      const updatedCart = cart.map((p) =>
        p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  
  


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
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="rounded-lg shadow-lg"
        />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600 text-lg">{product.description}</p>
          <div className="text-xl font-semibold text-green-600">
            ${product.price}
          </div>
<Link href='/cart'>
  <button>

  <button
  onClick={() => handleAddToCart(product)}
  className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
>
  Add to Cart
</button>
  </button>
</Link>


          {/* Rating Section */}
          <div className="mt-4">
            <div className="flex items-center gap-2 text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>
                  {i < Math.round(product.rating.rate) ? "★" : "☆"}
                </span>
              ))}
              <span className="text-sm text-gray-700 ml-2">
                ({product.rating.count} reviews)
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Average Rating: {product.rating.rate}/5
            </p>
          </div>

          <p className="text-sm text-gray-400">
            Category: <span className="capitalize">{product.category}</span>
          </p>
        </div>
        
      </div>
    </div>
    <PageFooter />
    </>

  );
};

export default ProductDetail;
