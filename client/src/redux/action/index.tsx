interface product {
    id:number;
}

export const addCart = (product:product) =>{
    return {
        type:"ADDITEM",
        payload:product
    }
}

// For Delete Item to Cart
export const delCart = (product:product) =>{
    return {
        type:"DELITEM",
        payload:product
    }
}