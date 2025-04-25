"use client";

import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { useRouter } from "next/router";

import Image from "next/image";

interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

const Product: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<ProductType | null>(null);
  const [similarProducts, setSimilarProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  // const dispatch = useDispatch();

  const addProduct = (product: ProductType) => {
    // dispatch(addCart(product));
  };

  useEffect(() => {
    if (!id) return;
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data: ProductType = await response.json();
      setProduct(data);
      setLoading(false);
      const response2 = await fetch(
        `https://fakestoreapi.com/products/category/${data.category}`
      );
      const data2: ProductType[] = await response2.json();
      setSimilarProducts(data2);
      setLoading2(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 py-3">{/* <Skeleton height={400} width={400} /> */}</div>
          <div className="col-md-6 py-5">
            <Skeleton height={30} width={250} />
            <Skeleton height={90} />
            <Skeleton height={40} width={70} />
            <Skeleton height={50} width={110} />
            <Skeleton height={120} />
            <Skeleton height={40} width={110} inline={true} />
            <Skeleton className="mx-3" height={40} width={110} />
          </div>
        </div>
      </div>
    );
  };

  const ShowProduct = () => {
    if (!product) return null;

    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 col-sm-12 py-3">
            <Image 
              className="img-fluid"
              src={product.image}
              alt={product.title}
              width={400}
              height={400} 
            />
          </div>
          <div className="col-md-6 py-5">
            <h4 className="text-uppercase text-muted">{product.category}</h4>
            <h1 className="display-5">{product.title}</h1>
            <p className="lead">
              {product.rating && product.rating.rate}{" "}
              <i className="fa fa-star"></i>
            </p>
            <h3 className="display-6  my-4">${product.price}</h3>
            <p className="lead">{product.description}</p>
            <button
              className="btn btn-outline-dark"
              onClick={() => addProduct(product)}
            >
              Add to Cart
            </button>
            <Link href="/cart" className="btn btn-dark mx-3">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const Loading2 = () => {
    return (
      <div className="my-4 py-4">
        <div className="d-flex">
          {[...Array(4)].map((_, i) => (
            <div className="mx-4" key={i}>
              {/* <Skeleton height={400} width={250} /> */}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <div className="py-4 my-4">
        <div className="d-flex">
          {similarProducts.map((item) => (
            <div key={item.id} className="card mx-4 text-center">
              <Image 
                className="card-img-top p-3"
                src={item.image}
                alt={item.title}
                height={300}
                width={300}
              />
               
              <div className="card-body">
                <h5 className="card-title">
                  {item.title.substring(0, 15)}...
                </h5>
              </div>
              {/* <ul className="list-group list-group-flush">
                <li className="list-group-item lead">${item.price}</li>
              </ul> */}
              <div className="card-body">
                <Link href={`/product/${item.id}`} className="btn btn-dark m-1">
                  Buy Now
                </Link>
                <button
                  className="btn btn-dark m-1"
                  onClick={() => addProduct(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">You may also Like</h2>
            {/* <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}> */}
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            {/* </Marquee> */}
          </div>
        </div>
      </div>
     
    </>
  );
};

export default Product;