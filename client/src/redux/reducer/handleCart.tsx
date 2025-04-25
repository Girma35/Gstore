
export interface CartItem {
  id: number;
  title: string;
  qty: number;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}



interface Action {
  type: string;
  payload: CartItem;
}

const initialCart: CartItem[] = (() => {
  if (typeof window !== "undefined") {

  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
  }
})();

const handleCart = (state: CartItem[] = initialCart, action: Action): CartItem[] => {
  const product = action.payload;
  let updatedCart: CartItem[];

  switch (action.type) {
    case "ADDITEM":
      const exist = state.find((x) => x.id === product.id);
      if (exist) {
        updatedCart = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        updatedCart = [...state, { ...product, qty: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    case "DELITEM":
      const exist2 = state.find((x) => x.id === product.id);
      if (exist2 && exist2.qty === 1) {
        updatedCart = state.filter((x) => x.id !== exist2.id);
      } else {
        updatedCart = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    default:
      return state;
  }
};

export default handleCart;