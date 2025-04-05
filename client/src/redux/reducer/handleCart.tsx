interface CartItem {
    id: number;
    qty: number;
    [key: string]: any;
  }
  
  // This function ensures that we can safely access localStorage only on the client side
  const getInitialCart = (): CartItem[] => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return []; // Return an empty array for SSR
  };
  
  const initialState: CartItem[] = getInitialCart();
  
  const handleCart = (
    state = initialState,
    action: { type: string; payload: CartItem }
  ): CartItem[] => {
    const product = action.payload;
    let updatedCart: CartItem[];
  
    switch (action.type) {
      case "ADDITEM":
        // Check if product already in cart
        const exist = state.find((x: CartItem) => x.id === product.id);
        if (exist) {
          // Increase the quantity
          updatedCart = state.map((x: CartItem) =>
            x.id === product.id ? { ...x, qty: x.qty + 1 } : x
          );
        } else {
          updatedCart = [...state, { ...product, qty: 1 }];
        }
        // Update localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        return updatedCart;
  
      case "DELITEM":
        const exist2 = state.find((x: CartItem) => x.id === product.id);
        if (exist2?.qty === 1) {
          updatedCart = state.filter((x: CartItem) => x.id !== exist2.id);
        } else {
          updatedCart = state.map((x: CartItem) =>
            x.id === product.id ? { ...x, qty: x.qty - 1 } : x
          );
        }
        // Update localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        return updatedCart;
  
      default:
        return state;
    }
  };
  
  export default handleCart;
  