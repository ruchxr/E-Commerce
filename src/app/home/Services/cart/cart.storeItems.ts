
import { Observable } from "rxjs";
import { StoreItem } from "../../../shared/storeItem";
import { Cart, CartItem } from "../../types/cart.type";
import { Product } from "../../types/products.type";

export class CartStoreItem extends StoreItem<Cart>{
    constructor(){
        const storedCart: any = sessionStorage.getItem('cart');
        if(storedCart){
            super(JSON.parse(storedCart))
        }
        else{
        super({
            products: [],
            totalAmount: 0,
            totalProducts: 0
        })}
    }

    public get cart$(): Observable<Cart>{
        return this.value$;
    }

    public get cart(): Cart{
        return this.value;
    }

    addProducts(product: Product){
        const cartProduct: CartItem | undefined = this.cart.products.find(
            (cartProduct) => cartProduct?.product.id === product.id
        );

        if(!cartProduct){
            this.cart.products = [
                ...this.cart.products,
                {
                    product: product,
                    amount: Number(product.price),
                    quantity: 1
                }
            ]
        }
        else{
            cartProduct.quantity++;
            cartProduct.amount += Number(product.price);
        }

        this.cart.totalAmount += Number(product.price);
        this.cart.totalProducts++;
        this.saveCart();
    }

    get totalProducts(): number{
        return this.cart.totalProducts;
    }

    removeProduct(product: CartItem){
        this.cart.products = this.cart.products.filter(
            (item) => item.product.id !== product.product.id
        )
        this.cart.totalProducts--;
        this.cart.totalAmount -= product.amount;
        if(this.cart.totalProducts === 0){
            sessionStorage.clear();
        }
        else{
            this.saveCart();
        }
    }

    decreaseProductQuantity(cartItem: CartItem){
        const cartProduct: CartItem | undefined = this.cart.products.find(
            (item) => item.product.id === cartItem.product.id
        );

        if(cartProduct){
            if(cartProduct.quantity === 1){
                this.removeProduct(cartProduct)
            }
            else{
                cartProduct.quantity--;
                this.cart.totalAmount -= Number(cartItem.product.price);
                --this.cart.totalProducts;
                this.saveCart();
            }
        }
    }

    saveCart(){
        sessionStorage.setItem('cart', JSON.stringify(this.cart)) 
    }

    clearCart(){
        sessionStorage.clear();
        this.cart.products = [];
        this.cart.totalAmount = 0;
        this.cart.totalProducts = 0;
    }
}