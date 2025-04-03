 "use client";

import React, { useState, useRef } from "react";
import style from "./nav.module.css";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Header = () => {
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeCart, setActiveCart] = useState(false);
  const [activeLogin, setActiveLogin] = useState(false);
  const [activeNavbar, setActiveNavbar] = useState(false);

  const searchFormRef = useRef(null);
  const shoppingCartRef = useRef(null);
  const loginFormRef = useRef(null);
  const navbarRef = useRef(null);

  const toggleSearchForm = () => {
    setActiveSearch((prev) => !prev);
    setActiveCart(false);
    setActiveLogin(false);
    setActiveNavbar(false);
  };

  const toggleShoppingCart = () => {
    setActiveCart((prev) => !prev);
    setActiveSearch(false);
    setActiveLogin(false);
    setActiveNavbar(false);
  };

  const toggleLoginForm = () => {
    setActiveLogin((prev) => !prev);
    setActiveSearch(false);
    setActiveCart(false);
    setActiveNavbar(false);
  };

  const toggleNavbar = () => {
    setActiveNavbar((prev) => !prev);
    setActiveSearch(false);
    setActiveCart(false);
    setActiveLogin(false);
  };

  return (
    <header className={style.header}>
      <Link href="/" className={style.logo}>
        <i className="fas fa-shopping-basket"></i> Gstore
      </Link>

      <nav className={`${style.navbar} ${activeNavbar ? style.active : ''}`} ref={navbarRef}>
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <div className={style.icons}>
        <div className="fas fa-bars" id={style.menu_btn} onClick={toggleNavbar}></div>
        <div className="fas fa-search" id={style.search_btn} onClick={toggleSearchForm}></div>
        <div className="fas fa-shopping-cart" id={style.cart_btn} onClick={toggleShoppingCart}></div>
        <div className="fas fa-user" id={style.login_btn} onClick={toggleLoginForm}></div>
      </div>

      <form
        action=""
        className={`${style.search_form} ${activeSearch ? style.active : ''}`}
        ref={searchFormRef}
      >
        <input type="search" id={style.search_box} placeholder="Search here..." />
        <label htmlFor="search_box" className="fas fa-search"></label>
      </form>


      <div
  className={`${style.shopping_cart} ${activeCart ? style.active : ''}`}
  ref={shoppingCartRef}
>
  <div className={style.box}>
    <i class="fas fa-trash"></i>
    <img src="photos/cart-img-1.png" alt="" />
    <div className={style.content}>
      <h3>watermelon</h3>
      <span className={style.price}>$4.99/-</span>
      <span className={style.quantity}>qty : 1</span>
    </div>
  </div>

  <div className={style.box}>
    <i class="fas fa-trash"></i>
    <img src="photos/cart-img-2.png" alt="" />
    <div className={style.content}>
      <h3>onion</h3>
      <span className={style.price}>$4.99/-</span>
      <span className={style.quantity}>qty : 1</span>
    </div>
  </div>

  <div className={style.box}>
    <i className="fas fa-trash"></i>
    <img src="photos/cart-img-3.png" alt="" />
    <div className={style.content}>
      <h3>chicken</h3>
      <span className={style.price}>$4.99/-</span>
      <span className={style.quantity}>qty : 1</span>
    </div>
  </div>

  <div className={style.total}>total : $19.69/-</div>
  <Link href="#" className={style.btn}>
    checkout
  </Link>
</div>


      <form
        action=""
        className={`${style.login_form} ${activeLogin ? style.active : ''}`}
        ref={loginFormRef}
      >
        <h3>login now</h3>
        <input type="email" placeholder="your email" className={style.box} />
        <input type="password" placeholder="your password" className={style.box} />
        <p>
          forget your password <a href="#">click here</a>
        </p>
        <p>
          don't have an account <a href="#">create now</a>
        </p>
        <input type="submit" value="login now" className={style.btn} />
      </form>
    </header>
  );
};

export default Header;


