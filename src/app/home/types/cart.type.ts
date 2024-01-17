import { Product } from "./products.type";

export interface CartItem{
    product: Product;
    quantity: number;
    amount: number;
}

export interface Cart{
    products: CartItem[];
    totalAmount: number;
    totalProducts: number;
}

export interface deliveryAddress{
    userName: string;
    address: string;
    city: string;
    state: string;
    pin: string;
}