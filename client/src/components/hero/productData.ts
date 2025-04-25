import React, { ReactNode } from 'react';

interface Product {
    id: number;
    type: string;
    name: string;
    price: number;
    color: {
        mode1?: string;
        mode2?: string;
        mode3?: string;
        mode4?: string;
        mode5?: string;
    };
    size: string;
}


interface Staff {
    id: number;
    name: string;
    buttonText: string;
}

export const product: Product[] = [
    {
        id: 1,
        type: "Plain console with teak mirror",
        name: "Teakwood Console with Ornamental Mirror",
        price: 5000,
        color: {
            mode1: "red",
            mode2: "black",
            mode3: "yellow", 
            mode4: "white",
            mode5: "pink"
        },
        size: "Standard"
    },
    {
        id: 2,
        type: "Granite dining table with dining chair",
        name: "Granite Dining Table Set with 4 Chairs",
        price: 3000,
        color: {
            mode1: "blue",
            mode2: "gray"
        },
        size: "6-Seater"
    },
    {
        id: 3,
        type: "Trenton modular sofa_3",
        name: "Trenton Modular 3-Seater Sofa",
        price: 7000,
        color: {
            mode1: "denim"
        },
        size: "220cm"
    },
    {
        id: 4,
        type: "Outdoor bar table and stool",
        name: "Outdoor Bar Table with Adjustable Stools",
        price: 9000,
        color: {
            mode1: "black",
            mode2: "white",
            mode3: "orange"
        },
        size: "Adjustable Height"
    }
];


export const staff: Staff[] = [
    {
        id: 1,
        name: "Going all-in with millennial design",
        buttonText : ""
        
    },
   
];