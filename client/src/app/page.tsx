"use client";

import React, { ReactNode } from 'react';
import { Provider } from "react-redux"; 
import store from "../redux/store";
import { usePathname } from "next/navigation";
import Home from "./Home/page";      
import Shop from "./shop/page";

export default function App({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <Provider store={store}>
      {pathname === "/" && <Home />}
      {pathname === "/shop" && <Shop />}
      {children}
    </Provider>
  );
}
